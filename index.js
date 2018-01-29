'use strict';

// Libraries
const
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	{ graphqlExpress, graphiqlExpress} = require('apollo-server-express');

// Local Modules
const schema = require('./schema/main');
require('./db/setup');

// Constants
const PORT = 8040;

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

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/public/index.html');
});

// Run server
app.listen(PORT, ()=>{
	console.log(`Listen http://localhost:${PORT}`);
});