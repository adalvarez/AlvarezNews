var app = angular.module('ANews');

app.controller('index-ctrl', function($http, $window, $location){
	let index = this;

	// Model
	index.isLog = false;
	index.showSearcher = false;
	index.userData = {};
	index.currentSection = 0;

	index.signin = ()=>{

		$http.post("/graphql",
			{
				query: GraphQL.mutations.logIn(index.logEmail, index.logPassword)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					index.userData = data.data.logIn;
					index.isLog = true;
				}
				else{
					index.isLog = false;
					console.error(data.errors[0].message);
				}

				index.logEmail = index.logPassword = "";

			});
	}

	index.signup = ()=>{

		$http.post("/graphql",
			{
				query: GraphQL.mutations.signUp(index.signName, index.signEmail, index.signPassword)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					index.userData = data.data.logIn;
					index.isLog = true;
				}
				else{
					index.isLog = false;
					console.error(data.errors[0].message);
				}

				index.signName = index.signEmail = index.signPassword = "";

			});
	}

	index.signOut = ()=>{
		$window.location.reload();
	}

	index.goANews = ()=>{
		$location.path('links');
		index.currentSection = 0;
	}

	index.goAbout = ()=>{
		$location.path('about');
		index.currentSection = 1;
	}

	index.goNewLink = ()=>{
		$location.path('newLink');
		index.currentSection = 2;
	}

});