'use strict';

// Libraries
const
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	CryptoJS = require("crypto-js"),
	{ graphqlExpress, graphiqlExpress} = require('apollo-server-express');

// Local Modules
const schema = require('./schema/main');
const Models = require('./models/');

// Constants
const PORT =  process.env.PORT || 8040;

// Server
const app = new express();

// Settings
app.use( bodyParser.json({limit : '50mb'}) );
app.use( bodyParser.urlencoded({extended: true}) );

// Setup static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Endpoints
// GraphQL
app.use(
	'/graphql',
	//bodyParser.json(),
	graphqlExpress({
		schema: schema,
		formatError: (error)=>{
			return {
				message: error.message
			}
		}
	})
);

// GraphiQL
app.use(
	'/graphiql',
	graphiqlExpress({
		endpointURL: '/graphql'
	})
);

app.get('/db', (req, res)=>{
	if(req.query.token){
		let decrypted = CryptoJS.AES.decrypt("U2FsdGVkX19h4pSvVQ93XVQta4d6rSIwoblDxdxGEGI=", req.query.token).toString(CryptoJS.enc.Utf8);
		if(decrypted === "access"){
			res.sendFile(__dirname + '/db/db.sqlite');
		}
		else{
			res.send("Wrong token");
		}
	}else{
		res.send("You need a token");
	}
});

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/public/index.html');
});

Models.sequelize.sync().then(() => {
	// Run server
	app.listen(PORT, ()=>{
		console.log(`Listen http://localhost:${PORT}`);
	});
});