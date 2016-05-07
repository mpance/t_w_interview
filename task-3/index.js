var request = require('superagent');
var fs = require('fs');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';
var banks,
    bankAccounts,
    payments;

banks = JSON.parse(fs.readFileSync('./banks.json'));
bankAccounts = JSON.parse(fs.readFileSync('./bankAccounts.json'));
payments = JSON.parse(fs.readFileSync('./payments.json'));


payments.forEach(function(curr, idx){
  var bankName = banks.find(function(elem, idx){
  	return elem.id === curr.recipientBankId;
  }).name;

  var sourceAcctNum = bankAccounts.find(function(elem, idx){
  	return elem.bankId === curr.recipientBankId && elem.accountName === "TransferWise Ltd";
  }).accountNumber;

  var targetAcctNum = curr.iban;
  var amount = curr.amount;

  makeTransfer(bankName, sourceAcctNum, targetAcctNum, amount);
})


function makeTransfer(bankName, sourceAcctNum, targetAcctNum, amount){
	request.post(`http://bootcamp-api.transferwise.com/bank/${bankName}/transfer/${sourceAcctNum}/${bankName}/${targetAcctNum}/${amount}`)
	       .query({ token: token })
	       .end(function(err, res) {
	                if(err) {
	                  console.log('Error', err);
	                } else {
	                	console.log("Respone: ", res)
	                }
	       });
}






