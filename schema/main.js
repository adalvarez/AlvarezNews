'use strict';

// Libraries
const { makeExecutableSchema } = require('graphql-tools');

// Resolvers
const resolvers = require('./resolvers');

// Definitions
const LinkDef = require('./entities/Link');
const UserDef = require('./entities/User');

const rootQuery = `
type Query {
	allLinks: [Link!]
	allUsers: [User!]
}

type Mutation{
	createLink(link: newLink!): Link
	updateLink(link: updateLink!): Link
	deleteLink(id: Int!): Link
	signUp(user: newUser!):User
	logIn(user: logUser!):User
}
`;

module.exports = makeExecutableSchema({
	typeDefs: [rootQuery, LinkDef, UserDef],
	resolvers: resolvers
})