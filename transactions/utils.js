import { Transaction } from "../models/models.js";


export const createTransaction = async (req, res, next) => {
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
    try {
        const newTransaction = await Transaction.create(
            { amount: req.body.amount,
                date: req.body.date,
                txnType: req.body.type,
                desciption: req.body.description
            });
        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};