import { renderExpenseForm, renderTransactions } from "./ui.js";
import { addTransaction, getTransactions } from "./transactions.js";

const addExpenseBtn = document.querySelector("#create-expense-btn");
const addExpenseBtn1 = document.querySelector("#create-expense1-btn");
const searchForm = document.querySelector("#search-form");

function closeForm() {
  addExpenseBtn?.classList.remove("active");
  addExpenseBtn1?.classList.remove("active");

  if (searchForm) {
    searchForm.classList.remove("hidden");
  }

  renderTransactions(getTransactions());
}

function openForm() {
  addExpenseBtn?.classList.add("active");
  addExpenseBtn1?.classList.add("active");

  if (searchForm) {
    searchForm.classList.add("hidden");
  }

  renderExpenseForm();

  const form = document.querySelector("#transaction-form");
  form?.addEventListener("submit", handleFormSubmit);

  const cancelBtn = document.querySelector("#cancel-new-expense");
  cancelBtn?.addEventListener("click", closeForm);
}

function toggleForm(event) {
  event.preventDefault();
  event.stopPropagation();

  const formWrapper = document.querySelector(".add-expense-form");

  if (formWrapper) {
    closeForm();
  } else {
    openForm();
  }
}

addExpenseBtn?.addEventListener("click", toggleForm);
addExpenseBtn1?.addEventListener("click", toggleForm);

function handleFormSubmit(event) {
  event.preventDefault();

  const type = document.querySelector("#transaction-type").value;
  const title = document.querySelector("#expense-title").value.trim();
  const amount = parseFloat(document.querySelector("#total-amount").value);
  const dateAndTime = document.querySelector("#date").value;

  if (!title || isNaN(amount) || amount <= 0 || !type) {
    return;
  }

  const newTransaction = {
    id: Date.now(),
    type: type,
    title: title,
    amount: amount,
    date: dateAndTime,
  };

  addTransaction(newTransaction);
  closeForm();
}