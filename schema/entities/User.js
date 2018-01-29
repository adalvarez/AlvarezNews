'use strict';

const UserDef = `
# An User represents an user in ÁlvarezNews
type User{
	# Identifier
	id: ID!
	# Name of User
	name: String!
	# Email of User
	email: String
	links: [Link!]
}

input newUser{
	# Name of User
	name: String!
	# Email of User
	email: String
	# Password of User
	password: String
}

input logUser{
	# Email of User
	email: String
	# Password of User
	password: String
}
`;

module.exports = UserDef;