'use strict';

const 
	User = require('../models/User'),
	CryptoJS = require("crypto-js");

module.exports = class UserCtrl{
	constructor(){
	}

	/**
	 * @param logUser: Ref: Input logUser in User entity
	 * @return Promise
	 */
	static logIn(logUser){
		return User.query()
			.eager('links')
			.where('email', logUser.email)
			.then((users)=>{
				let user = users[0];

				try{
					let passDB  = CryptoJS.AES.decrypt(user.password, logUser.password).toString(CryptoJS.enc.Utf8);
					if(passDB === logUser.email){
						return user;
					}
				}
				catch(e){
				}
				throw new Error('Wrong login');
			});
	}

	/**
	 * @param newUser: Ref: Input newUser in User entity
	 * @return Promise
	 */
	static signUp(newUser){
		newUser.password = CryptoJS.AES.encrypt(newUser.email, newUser.password);

		return User.query()
			.where('email', newUser.email)
			.then((users)=>{
				if(users.length === 0){
					return User.query().eager('links').insert(newUser);
				}
				else{
					throw new Error('Email is already registered');
				}
			});
	}

	/**
	 * @return Promise
	 */
	static getUsers(){
		return User.query().eager('links');
	}
}