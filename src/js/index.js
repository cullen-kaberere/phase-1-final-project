let totalExpenses = 0;
let expenses = [];

function calculate() {
    const budgetInput = document.getElementById("budget");
    const budgetDisplay = document.getElementById("budget-display");
    const budget = budgetInput.value;
    budgetDisplay.textContent = "Ksh " + budget;

    // Show the second form by removing the d-none class
    document.getElementById("secondForm").classList.remove("d-none");

    // Hide the entire container for the first form (including the surrounding layout)
    document.querySelector(".container").classList.add("d-none");
}

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

    // Create an expense object
    const expense = { description: expenseDescription, amount: expensesAmount };
    expenses.push(expense);

    // Accumulate expenses
    totalExpenses += expensesAmount;
    expensesDisplay.textContent = "Ksh " + totalExpenses;

    // Calculate and update the balance
    const budget = parseInt(document.getElementById("budget-display").textContent.replace("Ksh ", ""));
    const balance = budget - totalExpenses;
    document.getElementById("balance-display").textContent = "Ksh " + balance;

    // Add the expense to the list
    renderExpenseList();

    // Clear the input fields
    expensesDescInput.value = "";
    expensesAmountInput.value = "";
}

function renderExpenseList() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = ""; // Clear the list before rendering

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // Create separate elements for description and amount
        const description = document.createElement("span");
        description.textContent = expense.description;
        
        const amount = document.createElement("span");
        amount.style.marginLeft = "15px"; // Adds 15px space between description and amount
        amount.textContent = `Ksh ${expense.amount}`;

        // Append the description and amount to the list item
        li.appendChild(description);
        li.appendChild(amount);
        
        // Edit button with smaller size
        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm ms-2 btn-smaller";
        editButton.textContent = "Edit";
        editButton.onclick = () => editExpense(index);

        // Remove button with smaller size
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm ms-2 btn-smaller";
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeExpense(index);

        // Append buttons to the list item
        li.appendChild(editButton);
        li.appendChild(removeButton);
        
        // Append the list item to the expense list
        expenseList.appendChild(li);
    });
}


function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("expenses-desc").value = expense.description;
    document.getElementById("expenses-amount").value = expense.amount;

    removeExpense(index);
}

function removeExpense(index) {
    totalExpenses -= expenses[index].amount;
    expenses.splice(index, 1);
    renderExpenseList();

    document.getElementById("expenses-display").textContent = "Ksh " + totalExpenses;
    const budget = parseInt(document.getElementById("budget-display").textContent.replace("Ksh ", ""));
    const balance = budget - totalExpenses;
    document.getElementById("balance-display").textContent = "Ksh: " + balance;
}

function returnToFirstForm() {
    // Hide the second form
    document.getElementById("secondForm").classList.add("d-none");

    // Show the first form container
    document.querySelector(".container").classList.remove("d-none");

    // Clear previous inputs and data if necessary
    document.getElementById("budget").value = "";
    document.getElementById("budget-display").textContent = "Ksh 0.00";
    document.getElementById("expenses-display").textContent = "Ksh 0.00";
    document.getElementById("balance-display").textContent = "Ksh 0.00";
    totalExpenses = 0;
    expenses = [];
    renderExpenseList();
}
