//Starting transactions
let transactions = [
  { id: 1, type: "deposit", amount: 1000 },
  { id: 2, type: "withdraw", amount: 200 },
  { id: 3, type: "deposit", amount: 500 },
  { id: 4, type: "withdraw", amount: 100 }
];


//Calculate total deposits
function calculateTotalDeposits() {
  return transactions
    .filter((transaction) => transaction.type === "deposit")
    .reduce((total, transaction) => total + transaction.amount, 0);
}


//Calculate total withdrawals
function calculateTotalWithdrawals() {
  return transactions
    .filter((transaction) => transaction.type === "withdraw")
    .reduce((total, transaction) => total + transaction.amount, 0);
}


// Calculate the current balance
function calculateFinalBalance() {
  return calculateTotalDeposits() - calculateTotalWithdrawals();
}


// Find the largest transaction
function getLargestTransaction() {
  if (transactions.length === 0) {
    return null;
  }

  return transactions.reduce((largest, transaction) =>
    transaction.amount > largest.amount ? transaction : largest
  );
}


//Get all withdrawals
function getAllWithdrawals() {
  return transactions.filter(
    (transaction) => transaction.type === "withdraw"
  );
}


//Add a new transaction + rules for deposits and withdrawals
function addTransaction(type, amount) {
  // Make sure the transaction type is valid.
  if (type !== "deposit" && type !== "withdraw") {
    return {
      success: false,
      message: "Type must be deposit or withdraw."
    };
  }

  // Make sure the amount is a positive number.
  if (typeof amount !== "number" || amount <= 0) {
    return {
      success: false,
      message: "Amount must be greater than zero."
    };
  }

  const currentBalance = calculateFinalBalance();

  // Prevent the account from going below zero.
  if (type === "withdraw" && amount > currentBalance) {
    return { success: false, message: "Insufficient balance." };
  }

  // Assign an ID that is one greater than the current highest ID.
  const nextId =
    transactions.length === 0
      ? 1
      : Math.max(...transactions.map((transaction) => transaction.id)) + 1;

  // Create the transaction and add it to the transactions array.
  const newTransaction = { id: nextId, type: type, amount: amount };
  transactions.push(newTransaction);

  return { success: true, transaction: newTransaction };
}


//Example usage
console.log("Total deposits:", calculateTotalDeposits());       // 1500
console.log("Total withdrawals:", calculateTotalWithdrawals()); // 300
console.log("Final balance:", calculateFinalBalance());         // 1200
console.log("Largest transaction:", getLargestTransaction());
console.log("All withdrawals:", getAllWithdrawals());

// This withdrawal is rejected because the balance is only $1200.
console.log(addTransaction("withdraw", 1300));

// This withdrawal succeeds, and the balance becomes $1000.
console.log(addTransaction("withdraw", 200));
console.log("Updated balance:", calculateFinalBalance());