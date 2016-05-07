var request = require('superagent');
var token = 'aef3cbd9a33762a26d2148b399f906762a7475cc';

/*
*     <<<Start>>>
*/

// request.post('http://bootcamp-api.transferwise.com/task/6/start')
//        .query({ token: token })
//        .end(function(err, res) {
//                 if(err) {
//                      console.log('Error', err);
//                 } else {
//                      console.log(res.body);
//                 }
//        });



/*
*     <<<Finish>>>
*/

request.post('http://bootcamp-api.transferwise.com/task/finish')
       .query({ token: token })
       .end(function(err, res) {
                if(err) {
                     console.log('Error', err);
                } else {
                     console.log(res.body);
                }
       });