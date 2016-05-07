var request = require('superagent');
var fs = require('fs');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';

/*
*  Must first run node getJSONdata.js to populate JSON files (payments.json, banks.json, bankAccounts.json). Then run index.js.
*
*/

request.get('http://bootcamp-api.transferwise.com/bank')
       .query({ token: token })
       .end(function(err, res) {
                if(err) {
                     console.log('Error');
                } else {
                     fs.writeFile('banks.json', JSON.stringify(res.body), function(err) {
                     	if(err) {
                     		console.log("Write error: " + err.message)
                     	} else {
                     		console.log("Successfull Write to banks.json")
                     	}
                     })

                }
       });

request.get('http://bootcamp-api.transferwise.com/bankAccount')
       .query({ token: token })
       .end(function(err, res) {
                if(err) {
                     console.log('Error');
                } else {
                     fs.writeFile('bankAccounts.json', JSON.stringify(res.body), function(err) {
                     	if(err) {
                     		console.log("Write error: " + err.message)
                     	} else {
                     		console.log("Successfull Write to bankAccounts.json")
                     	}
                     })

                }
       });

request.get('http://bootcamp-api.transferwise.com/payment')
       .query({ token: token })
       .end(function(err, res) {
                if(err) {
                     console.log('Error');
                } else {
                     fs.writeFile('payments.json', JSON.stringify(res.body), function(err) {
                     	if(err) {
                     		console.log("Write error: " + err.message)
                     	} else {
                     		console.log("Successfull Write to payments.json")
                     	}
                     })

                }
       });