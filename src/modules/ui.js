export function renderExpenseForm() {
  const expensesLists = document.querySelector("#expenses-lists");
  const welcomeMsg = document.querySelector("#welcome-msg");

  if (welcomeMsg) {
    welcomeMsg.style.display = "none";
  }

  const existingLists = expensesLists.querySelectorAll(".expense-list");
  existingLists.forEach((list) => list.remove());

  if (!document.querySelector(".add-expense-form")) {
    const formWrapper = document.createElement("div");
    formWrapper.className = "add-expense-form";

    formWrapper.innerHTML = `
      <form id="transaction-form" class="transaction-form">
        <div class="transaction-form__group">
          <label for="transaction-type" class="transaction-form__label">Type <span>*</span></label>
          <select id="transaction-type" class="transaction-form__input" required>
            <option value="" disabled selected>Select a type...</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div class="transaction-form__group">
          <label for="expense-title" class="transaction-form__label">Expense title <span>*</span></label>
          <input type="text" id="expense-title" class="transaction-form__input" placeholder="Pizza" required>
        </div>
        <div class="transaction-form__group">
          <label for="total-amount" class="transaction-form__label">Total amount <span>*</span></label>
          <input type="number" id="total-amount" class="transaction-form__input" step="0.01" placeholder="5.99" required>
        </div>
        <div class="transaction-form__group">
          <label for="date" class="transaction-form__label">Date & Time <span>Optional</span></label>
          <input type="datetime-local" id="date" class="transaction-form__input">
        </div>

        <div class="transactions-form-btns">
          <button type="button" id="cancel-new-expense" class="transaction-form__submit">Cancel</button>
          <button type="submit" id="submit-new-expense" class="transaction-form__submit">Add Expense</button>
        </div>
      </form>
    `;

    expensesLists.appendChild(formWrapper);
  }
}

export function renderTransactions(transactions) {
  const expensesLists = document.querySelector("#expenses-lists");
  const welcomeMsg = document.querySelector("#welcome-msg");

  const formWrapper = document.querySelector(".add-expense-form");
  if (formWrapper) {
    formWrapper.remove();
  }

  const existingLists = expensesLists.querySelectorAll(".expense-list");
  existingLists.forEach((list) => list.remove());

  if (transactions.length === 0) {
    if (welcomeMsg) welcomeMsg.style.display = "block";
    return;
  }

  if (welcomeMsg) {
    welcomeMsg.style.display = "none";
  }

  transactions.forEach((transaction) => {
    const item = document.createElement("ul");
    item.classList.add("expense-list");

    item.innerHTML = `
      <li class="lists">${transaction.title}</li>
      <li class="lists">${transaction.type === "expense" ? "-" : "+"}${transaction.amount} TL</li>
      <li class="lists">${transaction.date || ""}</li>
      <img class="lists delete-btn" data-id="${transaction.id}" src="/icons/delete1.svg" alt="delete" />
    `;
    expensesLists.appendChild(item);
  });
}