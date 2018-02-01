'use strict';

var GraphQL = {
	queries:{
		allLinks: ()=>{
			return `
				{
					allLinks{
						id
						url
						description
						date
						user{
							name
							email
						}
					}
				}
			`;
		}
	},
	mutations:{
		logIn: (email, password)=>{
			return `
				mutation {
					logIn(user:{
						email: "${email}"
						password: "${password}"
					}){
						id
						name
						email
						links{
							id
							url
							description
							date
						}
					}
				}
			`;
		},
		signUp: (name, email, password)=>{
			return `
				mutation {
					signUp(user:{
						name: "${name}"
						email: "${email}"
						password: "${password}"
					}){
						name
						email
						links {
							url
							description
							date
						}
					}
				}
			`;
		},
		createLink: (url, description, userId)=>{
			return `
				mutation{
					createLink(link:{
						url: "${url}"
						description: "${description}"
						userId: ${userId}
					}){
						id
						url
						description
						date
					}
				}
			`;
		},
		updateLink: (id, url, description)=>{
			return `
				mutation{
					updateLink(link:{
						id: ${id}
						url: "${url}"
						description: "${description}"
					}){
						id
						url
						description
						date
					}
				}
			`;
		},
		deleteLink: (id)=>{
			return `
				mutation{
					deleteLink(id:${id}){
						id
					}
				}
			`;
		}
	}
}