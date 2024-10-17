let totalExpenses = 0;
let expenses = [];

function calculate() {
    const budgetInput = document.getElementById("budget");
    const budgetDisplay = document.getElementById("budget-display");
    const budget = budgetInput.value;
    budgetDisplay.textContent = "Ksh " + budget;

    // Show the second form by removing the d-none class
    document.getElementById("secondForm").classList.remove("d-none");

    // Hide the first form by adding the d-none class
    document.querySelector("form").classList.add("d-none");
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
        li.textContent = `${expense.description}: Ksh ${expense.amount}`;
        
        // Edit button
        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm ms-2";
        editButton.textContent = "Edit";
        editButton.onclick = () => editExpense(index);
        
        // Remove button
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm ms-2";
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeExpense(index);

        li.appendChild(editButton);
        li.appendChild(removeButton);
        expenseList.appendChild(li);
    });
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("expenses-desc").value = expense.description;
    document.getElementById("expenses-amount").value = expense.amount;

    // Remove the expense from the list to prevent duplication
    removeExpense(index);
}

function removeExpense(index) {
    totalExpenses -= expenses[index].amount; // Subtract the expense from the total
    expenses.splice(index, 1); // Remove the expense from the array
    renderExpenseList(); // Update the expense list display
    document.getElementById("expenses-display").textContent = "Ksh " + totalExpenses;

    // Update the balance
    const budget = parseInt(document.getElementById("budget-display").textContent.replace("Ksh ", ""));
    const balance = budget - totalExpenses;
    document.getElementById("balance-display").textContent = "Ksh " + balance;
}
