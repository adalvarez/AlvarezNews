'use strict';

const 
	UserCtrl = require('../controller/UserCtrl'),
	LinkCtrl = require('../controller/LinkCtrl');

const resolvers = {
	Query: {
		allLinks: ()=>{
			return LinkCtrl.getLinks();
		},
		allUsers: ()=>{
			return UserCtrl.getUsers();
		}
	},
	Mutation:{
		createLink: (_, params)=>{
			let newLink = params.link;
			return LinkCtrl.createLink(newLink)
		},
		updateLink: (_, params)=>{
			let updateLink = params.link;
			return LinkCtrl.updateLink(updateLink);
		},
		deleteLink: (_, params)=>{
			let id = params.id;
			return LinkCtrl.deleteLinks(id);
		},
		signUp: (_,params)=>{
			let newUser = params.user;
			return UserCtrl.signUp(newUser);
		},
		logIn: (_,params)=>{
			let logUser = params.user;
			return UserCtrl.logIn(logUser);
		}
	}
}

module.exports = resolvers;