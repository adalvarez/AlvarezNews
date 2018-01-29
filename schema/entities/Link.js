'use strict';

const LinkDef = `
# A Link represents a entry in ÁlvarezNews
type Link{
	# Identifier
	id: ID!
	# URL to share
	url: String!
	# Summary of Link
	description: String!
	# Date of posted
	date: String!
	# User who posted
	postedBy: User!
}

input newLink{
	# URL to share
	url: String!
	# Summary of Link
	description: String!
	# Identifier of the User
	postedBy: Int!
}

input updateLink{
	# Identifier
	id: Int!
	# URL to update
	url: String
	# Summary of Link to update 
	description: String
}
`;

module.exports = LinkDef;