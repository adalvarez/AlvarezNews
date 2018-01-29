'use strict';

const 
	Link = require('../models/Link'),
	User = require('../models/User'),
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
		return User.query()
			.findById(newLink.postedBy)
			.then((user) => {
				if (user === undefined) {
					throw new Error('User not found')
				}else {
					return Link.query().eager('postedBy').insert(newLink);
				}
			});
	}

	/**
	 * @param updateLink: Ref: Input updateLink in Link entity
	 * @return Promise
	 */
	static updateLink(updateLink){
		return Link.query().eager('postedBy').patchAndFetchById(updateLink.id, updateLink);
	}

	/**
	 * @param updateLink: 
	 * @return Promise
	 */
	static deleteLinks(id){
		let link = null;
		return Link.query().eager('postedBy').findById(id)
			.then((_link)=>{
				link = _link;
				return Link.query().deleteById(id)
			})
			.then(()=>{
				return link;
			});
	}

	static getLinks(){
		return Link.query().eager('postedBy');
	}
}