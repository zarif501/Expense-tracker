let transactions = [];

export function addTransaction(transaction) {
  transactions.push(transaction);
}

export function getTransactions() {
  return transactions;
}
