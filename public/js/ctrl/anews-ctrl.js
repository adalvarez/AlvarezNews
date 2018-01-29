var app = angular.module('ANews');

app.controller('anews-ctrl', function($http){
	let anews = this;

	// Model
	anews.isLog = false;
	anews.showSearcher = false;
	anews.userData = {};
	anews.links = [];

	anews.signin = ()=>{

		$http.post("/graphql",
			{
				query: GraphQL.mutations.logIn(anews.logEmail, anews.logPassword)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					anews.userData = data.data.logIn;
					anews.isLog = true;
				}
				else{
					anews.isLog = false;
					console.error(data.errors[0].message);
				}

				anews.logEmail = anews.logPassword = "";

			});
	}

	anews.signup = ()=>{

		$http.post("/graphql",
			{
				query: GraphQL.mutations.signUp(anews.signName, anews.signEmail, anews.signPassword)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					anews.userData = data.data.logIn;
					anews.isLog = true;
				}
				else{
					anews.isLog = false;
					console.error(data.errors[0].message);
				}

				anews.signName = anews.signEmail = anews.signPassword = "";

			});
	}

	anews.loadLinks = ()=>{
		$http.post("/graphql",
			{
				query: GraphQL.queries.allLinks()
			})
			.then((respuesta)=> {
				let data = respuesta.data;
				anews.links = data.data.allLinks;
			});
	}


	anews.loadLinks();

})