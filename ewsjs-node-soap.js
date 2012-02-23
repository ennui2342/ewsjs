#!/usr/bin/env node

var express = require('express'),
	app = express.createServer(),
	soap = require('soap'),
	wsdl = 'Services.wsdl';

var ews = {
	get_ooo: function(soap, wsdl) {
		soap.createClient(wsdl, function(err, client) {
			if (err) {
				ews.respond(err);
			} else {
				client.setSecurity(new soap.BasicAuthSecurity(ews.req.params.email, ews.req.query.password));
				client.GetUserOofSettings({'t:Mailbox': {'t:Address': ews.req.params.email}}, ews.respond);
			}
		});
	},

	set_ooo: function(soap, wsdl) {
		soap.createClient(wsdl, function(err, client) {
			if (err) {
				ews.respond(err);
			} else {
				client.setSecurity(new soap.BasicAuthSecurity(ews.req.params.email, ews.req.query.password));
				client.SetUserOofSettings(ews.req.body, ews.respond);
			}
		});
	},

	respond: function(err, result) {
		if (err) {
			ews.res.contentType('text/plain');
			ews.res.send(err.stack);
		} else {
			ews.res.contentType('application/json');
			ews.res.send(JSON.stringify(result));
		}
	}
}

app.configure(function() {
	app.use(express.bodyParser());
});

app.all('/:email', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.get('/:email', function (req, res) {
	ews.res = res;
	ews.req = req;
	ews.get_ooo(soap, wsdl);
});

app.post('/:email', function (req, res) {
	ews.res = res;
	ews.req = req;
	ews.set_ooo(soap, wsdl);
});

console.log('Listening on port: ' + 8084);
app.listen(8084);
