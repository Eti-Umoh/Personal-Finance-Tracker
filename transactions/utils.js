import { Transaction } from "../models/models.js";


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
        const error = new Error('type is missing in the req body');
        error.status = 400;
        return next(error);
    }
    try {
        const newTransaction = await Transaction.create(
            { 
                amount: amount,
                date: date,
                txnType: type,
                desciption: description,
                userId: currentUserId
            });
        res.status(201).json({'message': 'success', 'Transaction': newTransaction});
    } catch (error) {
        next(error);
    }
};

// export const getAllPosts = async (req, res, next) => {
//     try {
//         const posts = await Post.findAll();
//         res.status(200).json(posts);
//     } catch (error) {
//         next(error);
//     }
// };