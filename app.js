var Twocheckout = require('2checkout-node');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded());


app.get('/', function(request, response) {
    response.render('index')
});

app.post('/order', function(request, response) {
    var tco = new Twocheckout({
        sellerId: "250272031566",                                  // Seller ID, required for all non Admin API bindings
        privateKey: "700D55D4-A166-42C1-9BEE-D4BF56B9440A",                              // Payment API private key, required for checkout.authorize binding
        // sandbox: false                                                   // Uses 2Checkout sandbox URL for all bindings
    });

    var params =  {
        "merchantOrderId": "123",
        "token": request.body.token,
        "currency": "USD",
        "total": "10.00",
        "billingAddr": {
            "name": "Testing Tester",
            "addrLine1": "123 Test St",
            "city": "Columbus",
            "state": "Ohio",
            "zipCode": "43123",
            "country": "USA",
            "email": "example@2checkout.com",
            "phoneNumber": "5555555555"
        }
    };

    tco.checkout.authorize(params, function (error, data) {
        if (error) {
            response.send(error.message);
        } else {
            response.send(data.response.responseMsg);
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});