let balance = document.getElementById('balance');
let moneyCredit = document.getElementById('money-credit');
let moneyDebit = document.getElementById('money-debit');
let list = document.getElementById('list');
let form = document.getElementById('add-form');
let reason = document.getElementById('reason');
let amount = document.getElementById('amount');

let Transactions = [
    {id:1,reason:'Salary',amount:5000},
    {id:2,reason:'BreakFast',amount:-20},
    {id:3,reason:'Lunch',amount:-30},
    {id:1,reason:'Salary',amount:-60}
];
let transactions = Transactions;

function displayTransaction(transactions){
    let type = transactions.amount > 0 ? '+' : '';
    let li = document.createElement('li');
    li.classList.add(transactions.amount > 0 ? 'credit' : 'debit');
    li.innerHTML = `
        ${transactions.reason}<span>${type}${transactions.amount}</span>
        <button class="del-btn" onclick="delTransaction(${transactions.id})"><i class="fa-regular fa-trash-can"></i></button>
    `;
    list.appendChild(li)
};

function delTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function updateBalance(){
    let transactionAmounts = transactions.map(transaction => transaction.amount);
    let totalBalance = transactionAmounts.reduce((acc,amount) => (acc += amount), 0);
    let creditBalance = transactionAmounts.filter(amount => amount > 0).reduce((acc,amount) => (acc += amount), 0);
    let debitBalance = transactionAmounts.filter(amount => amount < 0).reduce((acc,amount) => (acc += amount), 0);
    balance.innerText = `$${totalBalance}`
    moneyCredit.innerText = `$${creditBalance}`
    moneyDebit.innerText = `$${debitBalance}`
}

function init(){
    list.innerHTML = "";
    transactions.forEach(displayTransaction);
    updateBalance();
}

function getId(){
    return Math.floor(Math.random() * 10000000)
}

function addTransaction(e){
    e.preventDefault();
    let reasonText = reason.value; 
    let amountText = amount.value;
    if(reasonText.trim() === "" || amountText.trim() === ""){
        alert('Plz Fillout the Reason and Amount of the Transaction');
    }else{
        let transaction = {
            id : getId(),
            reason : reasonText,
            amount : +amountText
        };
        transactions.push(transaction);
        displayTransaction(transaction);
        updateBalance();
    }
    reason.value = ""
    amount.value = ""
}

init();

form.addEventListener('submit', addTransaction)