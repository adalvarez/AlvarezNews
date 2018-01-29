'use strict';

var GraphQL = {
	queries:{
		allLinks: ()=>{
			return `
				{
					allLinks{
						url
						description
						date
						postedBy{
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
		createLink: (url, description, postedBy)=>{
			return `
				mutation{
					createLink(link:{
						url: "${url}"
						description: "${description}"
						postedBy: ${postedBy}
					}){
						id
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