var request = require('superagent');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';

var currencies = ["EUR", "USD", "GBP", "INR", "MXN"];

currencies.forEach(function(elem, idx) {
  for(var i = 0; i < currencies.length; i++) {
  	if(elem != currencies[i]) {
  		exposeHiddenFees(100, elem, currencies[i]);
  		exposeHiddenFees(1000, elem, currencies[i]);
  		exposeHiddenFees(10000, elem, currencies[i]);
  	}
  }
})

function exposeHiddenFees(amount, source, target) {
	request.get(`http://bootcamp-api.transferwise.com/quote/${amount}/${source}/${target}`)
	       .query({ token: token })
	       .end(function(err, res) {
	       	  if(err) {
	       	  	console.log('Error with getting quotes', err);
	       	  } else {
	       	  	var quotes = res.body;

	       	  	request.get(`http://bootcamp-api.transferwise.com/rate/midMarket/${source}/${target}`)
		       	  		   .query({ token: token })
		       	  		   .end(function(err, res) {
		       	  		     if(err) {
		       	  				   console.log('Error with getting mid-market rate', err);
		       	  			   } else {
		       	  				    var midMktRate = res.body.rate;

		       	  				    for(provider in quotes) {
		       	  				    	var percentageRipOff = calculateRipOff(quotes, provider, midMktRate);
		       	  				    	postHiddenFee(provider, quotes[provider].sourceAmount, quotes[provider].sourceCurrency, quotes[provider].targetCurrency, percentageRipOff);
		       	  				    }
		       	  			   }
	       	  	})
	       	  }
	       });
}


function calculateRipOff(quotes, provider, midMktRate, source, target) {
		var dishonestValue = quotes[provider].targetValue;
		var fairValue = quotes[provider].sourceAmount * midMktRate;
		var percentageRipOff = Math.floor(((fairValue - dishonestValue) / dishonestValue) * 100);

		return percentageRipOff;
}

function postHiddenFee(provider, sourceAmount, sourceCurrency, targetCurrency, percentageRipOff) {
	request.post(`http://bootcamp-api.transferwise.com/hiddenFee/forCompany/${provider}/${sourceAmount}/${sourceCurrency}/${targetCurrency}/${percentageRipOff}`)
				 .query({ token: token })
				 .end(function(err, res) {
				 		if(err) {
				 			console.log('Error with posting hidden fee');
				 		} else {
				 			console.log('Success posting hidden fee of ' + percentageRipOff + ' percent, from ' + provider + '. Source currency: ' + sourceCurrency + '. Source Amount: ' + sourceAmount + '. Target Currency: ' + targetCurrency);
				 		}
				 })
}