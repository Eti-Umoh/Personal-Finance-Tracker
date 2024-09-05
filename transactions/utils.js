import { Transaction } from "../models/models.js";
import { transactionSerializer, transactionsSerializer } from "./serializers.js";


export const createTransaction = async (req, res, next) => {
    const amount = req.body.amount;
    const type = req.body.type;
    const description = req.body.description;
    const date = req.body.date;
    const currentUserId = req.user.id;

    if (!req.body.amount) {
        const error = new Error('amount is missing in the req body');
        error.status = 400;
        return next(error);
    }
    else if (!req.body.type) {
        const error = new Error('type is missing in the req body');
        error.status = 400;
        return next(error);
    }
    else if (!['debit', 'credit'].includes(type)) {
        const error = new Error('type must be debit or credit');
        error.status = 400;
        return next(error);
    }
    try {
        const newTransaction = await Transaction.create(
            { 
                amount: amount,
                date: date,
                txnType: type,
                description: description,
                userId: currentUserId
            });

        const serializedTransaction = await transactionSerializer(newTransaction)
        res.status(201).json({Transaction: serializedTransaction, message: 'success'});
    }
    catch (error) {
        next(error);
    }
};


export const getAllTransactions = async (req, res, next) => {
    const currentUserId = req.user.id;
    try {
        const transactions = await Transaction.findAll({ where: { userId: currentUserId } });
        const serializedTransactions = await transactionsSerializer(transactions);
        res.status(200).json({Transactions: serializedTransactions, message: 'success'});
    } 
    catch (error) {
        next(error);
    }
};


export const updateTransaction = async (req, res, next) => {
    const amount = req.body.amount;
    const type = req.body.type;
    const description = req.body.description;
    const date = req.body.date;
    const currentUserId = req.user.id;
    const txnId = parseInt(req.params.txnId);

    try {
        const transaction = await Transaction.findOne({ where: { id: txnId, userId: currentUserId } });
        if (transaction) {
            transaction.amount = amount;
            transaction.txnType = type;
            transaction.date = date;
            transaction.description = description;
            transaction.save();
        }
        else {
            const error = new Error(`Transaction with id :${txnId}: not found`);
            error.status = 404;
            return next(error);
        }

        const serializedTransaction = await transactionSerializer(transaction)
        res.status(200).json({Transaction: serializedTransaction, message: 'success'});
    }
    catch (error) {
        next(error);
    }
};
