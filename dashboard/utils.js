import { Transaction } from "../models/models.js";


export const getStats = async (req, res, next) => {
    const currentUserId = req.user.id;
    try {
        const creditTxns = await Transaction.findAll({ where: {
            userId: currentUserId,
            txnType: "credit" } });
        const debitTxns =  await Transaction.findAll({ where: {
            userId: currentUserId,
            txnType: "debit" } });

        // Calculate total income and expense
        let income = 0;
        let expense = 0;

        creditTxns.forEach(txn => {
            income += parseFloat(txn.amount);});

        debitTxns.forEach(txn => {
            expense += parseFloat(txn.amount);});

        // Calculate the difference (Profit/Loss)
        const difference = income - expense;

        res.status(200).json({
            totalIncome: income, totalExpense: expense,
            'Loss/Profit': difference, message: 'successful'});
    } 
    catch (error) {
        next(error);
    }
};