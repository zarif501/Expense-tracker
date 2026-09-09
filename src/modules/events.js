import { 
  renderExpenseForm, 
  renderTransactions, 
  updateDashboardSummary 
} from "./ui.js";

import { 
  addTransaction, 
  getTransactions, 
  calculateTotals, 
  deleteTransaction 
} from "./transactions.js";

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
  
  const { income, expense } = calculateTotals();
  updateDashboardSummary(income, expense);

  closeForm();
}

const deleteExpenseContainer = document.querySelector("#expenses-lists");

deleteExpenseContainer?.addEventListener(`click`, (e)=> {

  const deleteBtn = e.target.closest(".delete-btn");
  if (!deleteBtn)return;

  const id = Number(deleteBtn.dataset.id)

  deleteTransaction(id);
  renderTransactions(getTransactions());

  const { income, expense } = calculateTotals();
  updateDashboardSummary(income, expense);
})

function updateUI() {
  renderTransactions(getTransactions());
  const { income, expense } = calculateTotals();
  updateDashboardSummary(income, expense);
}
updateUI();

const searchInput = document.querySelector("#search-input");
const searchFormEl = document.querySelector("#search-form");
searchFormEl.addEventListener("submit", (e)=>{e.preventDefault();});

searchInput.addEventListener("input", (e)=>{
  const query = e.target.value.toLowerCase().trim();

  const allTransactions = getTransactions();

  if (!query) {
    renderTransactions(allTransactions);
    return;
  }
  const matchingTransactions = allTransactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(query)
  );
  renderTransactions(matchingTransactions);
});

export function updateSearchParam(query) {
  const url = new URL(window.location);

  if (query) {
    url.searchParams.set("search", query);
  } else {
    url.searchParams.delete("search");
  }

  // Updates the address bar silently
  window.history.replaceState({}, "", url);
}

searchInput?.addEventListener("input", (e) => {
  const query = e.target.value;

  // 1. Keep URL in sync
  updateSearchParam(query);

  // 2. Filter and render
  applySearchFilter(query);
});

// At the bottom of events.js (during startup/hydration)
const initialParams = new URLSearchParams(window.location.search);
const initialSearch = initialParams.get("search");

if (initialSearch && searchInput) {
  searchInput.value = initialSearch; // Fill the input box
  applySearchFilter(initialSearch);  // Render filtered results
} else {
  renderTransactions(getTransactions());
}

// Summary cards always show total finances regardless of search view
const { income, expense } = calculateTotals();
updateDashboardSummary(income, expense);