import { Transaction } from "../models/models.js";


export const deleteTransaction = async (req, res, next) => {
    const currentUserId = req.user.id;
    const txnId = req.params.txnId;
    try {
        const transaction = await Transaction.findOne({ where: { id: txnId, userId: currentUserId } });
        if (!transaction) {
            const error = new Error(`Transaction with id :${txnId}: not found`);
            error.status = 404;
            return next(error);
        }
        await transaction.destroy();
        res.status(200).json({message: 'transaction deleted successfully'});
    } 
    catch (error) {
        next(error);
    }
};