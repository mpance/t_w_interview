var request = require('superagent');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';

request.get('http://bootcamp-api.transferwise.com/task/5')
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with getting quotes', err);
	       	  } else {
	       	  	var peps = res.body.peps;
							request.get('http://bootcamp-api.transferwise.com/payment')
								       .query({ token: token })
								       .end(function(err, res) {
								       	  if(err) {
								       	  	console.log('Error with getting quotes', err);
								       	  } else {
								       	  	var payments = res.body;
								       	  	findPep(peps, payments);
								       	  }
								       });
	       	  }
	       });

function findPep(peps, payments) {
		payments.forEach(function(elem, idx){
			var re = new RegExp(elem.recipientName);
			var match = false;

			for(var i = 0; i < peps.length; i++) {
				if(peps[i].match(re)) {
					match = true;
				}	
			}

			if(match === true) {
				putPep(elem.id);
			} else {
				deletePep(elem.id);
			}

		})
}

function putPep(id) {
	request.put(`http://bootcamp-api.transferwise.com/payment/${id}/aml`)
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with putting Pep', err);
	       	  } else {
	       	  	console.log('Success in putting Pep ')
	       	  }
	       });
}

function deletePep(id) {
	request.del(`http://bootcamp-api.transferwise.com/payment/${id}/aml`)
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with deleting non-Pep', err);
	       	  } else {
	       	  	console.log('Success in deleting non-Pep');
	       	  }
	       });
}