var request = require('superagent');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';

request.get('http://bootcamp-api.transferwise.com/payment')
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with getting quotes', err);
	       	  } else {
	            	findFraudsters(res.body);
	       	  }
	       });

function findFraudsters(payments) {
	payments.forEach(function(elem, idx){
		if(elem.ip.match(/52.224.92/)) {
			putFraud(elem.id);
		} else {
			deleteNonFraud(elem.id);
		}
	})
}

function putFraud(id) {
	request.put(`http://bootcamp-api.transferwise.com/payment/${id}/fraud`)
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with putting Fraud', err);
	       	  } else {
	       	  	console.log('Success in putting Fraud ')
	       	  }
	       });
}

function deleteNonFraud(id) {
	request.del(`http://bootcamp-api.transferwise.com/payment/${id}/fraud`)
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with deleting non-Fraud', err);
	       	  } else {
	       	  	console.log('Success in deleting non-Fraud');
	       	  }
	       });
}