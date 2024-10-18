let totalExpenses = 0;
let expenses = [];
let currentCurrency = 'Ksh'; // Default currency

// Function to calculate and display the budget
function calculate() {
    const budgetInput = document.getElementById("budget");
    const budgetDisplay = document.getElementById("budget-display");
    const budget = budgetInput.value;
    budgetDisplay.textContent = currentCurrency + " " + budget;

    // Show the second form by removing the d-none class
    document.getElementById("secondForm").classList.remove("d-none");

    // Hide the entire container for the first form (including the surrounding layout)
    document.querySelector(".container").classList.add("d-none");
}

// Function to add an expense
function addExpense() {
    const expensesDescInput = document.getElementById("expenses-desc");
    const expensesAmountInput = document.getElementById("expenses-amount");
    const expensesDisplay = document.getElementById("expenses-display");

    const expenseDescription = expensesDescInput.value;
    const expensesAmount = parseInt(expensesAmountInput.value);

    if (!expenseDescription || isNaN(expensesAmount) || expensesAmount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = { description: expenseDescription, amount: expensesAmount };
    expenses.push(expense);

    totalExpenses += expensesAmount;
    expensesDisplay.textContent = currentCurrency + " " + totalExpenses;

    const budget = parseInt(document.getElementById("budget-display").textContent.replace(currentCurrency + " ", ""));
    const balance = budget - totalExpenses;
    document.getElementById("balance-display").textContent = currentCurrency + " " + balance;

    renderExpenseList();

    expensesDescInput.value = "";
    expensesAmountInput.value = "";
}

// Function to render the list of expenses
function renderExpenseList() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = ""; // Clear the list before rendering

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const description = document.createElement("span");
        description.textContent = expense.description;

        const amount = document.createElement("span");
        amount.style.marginLeft = "15px";
        amount.textContent = currentCurrency + " " + expense.amount;

        li.appendChild(description);
        li.appendChild(amount);

        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm ms-2 btn-smaller";
        editButton.textContent = "Edit";
        editButton.onclick = () => editExpense(index);

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm ms-2 btn-smaller";
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeExpense(index);

        li.appendChild(editButton);
        li.appendChild(removeButton);

        expenseList.appendChild(li);
    });
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("expenses-desc").value = expense.description;
    document.getElementById("expenses-amount").value = expense.amount;

    removeExpense(index);
}

// Function to remove an expense
function removeExpense(index) {
    totalExpenses -= expenses[index].amount;
    expenses.splice(index, 1);
    renderExpenseList();

    document.getElementById("expenses-display").textContent = currentCurrency + " " + totalExpenses;
    const budget = parseInt(document.getElementById("budget-display").textContent.replace(currentCurrency + " ", ""));
    const balance = budget - totalExpenses;
    document.getElementById("balance-display").textContent = currentCurrency + " " + balance;
}

// Function to return to the first form and reset values
function returnToFirstForm() {
    document.getElementById("secondForm").classList.add("d-none");
    document.querySelector(".container").classList.remove("d-none");

    document.getElementById("budget").value = "";
    document.getElementById("budget-display").textContent = currentCurrency + " 0.00";
    document.getElementById("expenses-display").textContent = currentCurrency + " 0.00";
    document.getElementById("balance-display").textContent = currentCurrency + " 0.00";
    totalExpenses = 0;
    expenses = [];
    renderExpenseList();
}

// Function to convert currency using an API
async function convertCurrency() {
    const selectedCurrency = document.getElementById("currency-select").value;
    const apiKey = 'ae193a0e7b9ac60f1dfb55cc'; // Replace with your API key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/KES`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const exchangeRate = data.conversion_rates[selectedCurrency];
        if (!exchangeRate) {
            alert("Currency conversion failed. Please try again.");
            return;
        }

        // Update all amounts
        convertAmounts(exchangeRate, selectedCurrency);
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        alert("An error occurred while converting currency.");
    }
}

// Function to convert amounts to the selected currency
function convertAmounts(exchangeRate, newCurrency) {
    const budgetDisplay = document.getElementById("budget-display");
    const expensesDisplay = document.getElementById("expenses-display");
    const balanceDisplay = document.getElementById("balance-display");

    // Convert the budget
    const currentBudget = parseFloat(budgetDisplay.textContent.replace(currentCurrency + " ", ""));
    const newBudget = (currentBudget * exchangeRate).toFixed(2);
    budgetDisplay.textContent = newCurrency + " " + newBudget;

    // Convert the expenses
    const currentExpenses = parseFloat(expensesDisplay.textContent.replace(currentCurrency + " ", ""));
    const newExpenses = (currentExpenses * exchangeRate).toFixed(2);
    expensesDisplay.textContent = newCurrency + " " + newExpenses;

    // Convert the balance
    const currentBalance = parseFloat(balanceDisplay.textContent.replace(currentCurrency + " ", ""));
    const newBalance = (currentBalance * exchangeRate).toFixed(2);
    balanceDisplay.textContent = newCurrency + " " + newBalance;

    // Update individual expenses
    expenses = expenses.map(expense => {
        expense.amount = (expense.amount * exchangeRate).toFixed(2);
        return expense;
    });

    currentCurrency = newCurrency;
    renderExpenseList();
}
