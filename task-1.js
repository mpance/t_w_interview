var request = require('superagent');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';

request.post('http://bootcamp-api.transferwise.com/name/Marko%20Pance')
       .query({ token: token })
       .end(function(err, res) {
       	  if(err) {
       	  	console.log('Error with POST /name/<name>', err);
       	  } else {
       	  	console.log(res);
       	  }
       });
