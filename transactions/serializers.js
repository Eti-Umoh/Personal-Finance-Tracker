export const transactionSerializer = async (transaction) => {
    return {
        "id": transaction.id,
        "amount": parseInt(transaction.amount),
        "date": transaction.date,
        "txnType": transaction.txnType,
        "description": transaction.description,
        "userId": transaction.userId,
        "createdAt": transaction.createdAt,
        "updatedAt": transaction.updatedAt
    };
};


export const transactionsSerializer = async (transactions) => {
    const serializedTransactions = await Promise.all(transactions.map(async (transaction) => {
        return await transactionSerializer(transaction);
    }));
    return serializedTransactions;
};
