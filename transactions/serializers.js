export const transactionSerializer = async (transaction) => {
    return {
        "amount": parseInt(transaction.amount),
        "date": transaction.date,
        "txnType": transaction.txnType,
        "description": transaction.description,
        "userId": transaction.userId
    };
};


export const transactionsSerializer = async (transactions) => {
    const serializedTransactions = transactions.map(transaction => transactionSerializer(transaction));
    return serializedTransactions;
};
