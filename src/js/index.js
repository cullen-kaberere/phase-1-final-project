function calculate() {
    const budgetInput = document.getElementById("budget");
    const budgetDisplay = document.getElementById("budget-display");
    const budget = budgetInput.value;
    budgetDisplay.textContent = "Ksh " + budget;
  }
  
  function addExpense() {
    const expensesAmountInput = document.getElementById("expenses-amount");
    const expensesDisplay = document.getElementById("expenses-display");
    const expensesAmount = expensesAmountInput.value;
    expensesDisplay.textContent = "Ksh " + expensesAmount;
  
    // Calculate and update the balance
    const budget = parseInt(document.getElementById("budget-display").textContent.replace("Ksh ", ""));
    const expenses = parseInt(expensesAmount);
    const balance = budget - expenses;
    document.getElementById("balance-display").textContent = "Ksh " + balance;
  }