'use strict';

const 
	// User = require('../models/User'),
	Models = require('../models/'),
	CryptoJS = require("crypto-js");

module.exports = class UserCtrl{
	constructor(){
	}

	/**
	 * @param logUser: Ref: Input logUser in User entity
	 * @return Promise
	 */
	static logIn(logUser){
		return Models.users.findAll({
			where:{
				email:logUser.email
			},
			include: [
				{model: Models.links}
			]
		}).then((users)=>{
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
		newUser.password = CryptoJS.AES.encrypt(newUser.email, newUser.password).toString();

		return Models.users.findAll({
			where:{
				email:newUser.email
			}
		}).then((users)=>{
			if(users.length === 0){
				return Models.users.create(newUser);
			}else{
				throw new Error('Email is already registered');
			}
		});
	}

	/**
	 * @return Promise
	 */
	static getUsers(){
		return Models.users.findAll({
			include: [
				{model: Models.links}
			]
		});
	}
}