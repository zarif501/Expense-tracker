let transactions = [];

export function addTransaction(transaction) {
  transactions.push(transaction);
}

export function getTransactions() {
  return transactions;
}

export function calculateIncome() {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);
}

export function calculateExpenses() {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);
}

export function calculateTotals() {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.income += t.amount;
      } else if (t.type === "expense") {
        acc.expense += t.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
}

export function deleteTransission() {
  const deleteId = document.querySelector("$transaction.id").value;
  
}