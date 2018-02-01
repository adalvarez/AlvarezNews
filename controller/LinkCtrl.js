'use strict';

const 
	Models = require('../models/'),
	format = require('date-fns/format');

module.exports = class LinkCtrl{
	constructor(){
	}

	/**
	 * @param newLink: Ref: Input newLink in Link entity
	 * @return Promise
	 */
	static createLink(newLink){
		newLink.date = format(new Date(), 'MM/DD/YYYY HH:mm:ss');
		return Models.users.findAll({
			where:{
				id: newLink.userId
			}
		}).then((users)=>{
			let user = users[0];
			if (user === undefined) {
				throw new Error('User not found')
			}else {
				return Models.links.create(newLink);
			}
		});
	}

	/**
	 * @param updateLink: Ref: Input updateLink in Link entity
	 * @return Promise
	 */
	static updateLink(updateLink){
		return Models.links.update(updateLink,{
			where:{
				id: updateLink.id
			}
		}).then(()=>{
			return Models.links.findById(updateLink.id);
		});
	}

	/**
	 * @param id: Id link to delete
	 * @return Promise
	 */
	static deleteLinks(id){
		let link = null;
		return Models.links.findById(id)
			.then((_link)=>{
				link = _link;
				return Models.links.destroy({
					where:{
						id:id
					}
				})
			})
			.then(()=>{
				return link;
			});
	}

	static getLinks(){
		return Models.links.findAll({
			include: [
				{model: Models.users}
			]
		});
	}
}