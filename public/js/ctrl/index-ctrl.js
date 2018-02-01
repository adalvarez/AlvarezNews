var app = angular.module('ANews');

app.controller('index-ctrl', function($http, $window, $location, linksFactory){
	let index = this;

	// Model
	index.isLog = linksFactory.getIsLog();
	index.showSearcher = false;
	index.userData = linksFactory.getUserData();
	index.currentSection = linksFactory.getCurrentSection();

	index.signin = ()=>{

		$http.post("/graphql",
			{
				query: GraphQL.mutations.logIn(index.logEmail, index.logPassword)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					index.userData = linksFactory.setUserData(data.data.logIn);
					index.isLog = linksFactory.setIsLog(true);
				}
				else{
					index.isLog = linksFactory.setIsLog(false);
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
					index.userData = linksFactory.setUserData(data.data.logIn);
					index.isLog = linksFactory.setIsLog(true);
				}
				else{
					index.isLog = linksFactory.setIsLog(false);
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
		index.currentSection = linksFactory.setCurrentSection(0);
	}

	index.goAbout = ()=>{
		$location.path('about');
		index.currentSection = linksFactory.setCurrentSection(1);
	}

	index.goNewLink = ()=>{
		$location.path('newLink');
		index.currentSection = linksFactory.setCurrentSection(2);
	}

	index.goMyLinks = ()=>{
		$location.path('myLinks');
		index.currentSection = linksFactory.setCurrentSection(3);
	}
});