var app = angular.module('ANews');

app.controller('newLink-ctrl', function($http, $location, $scope, $timeout, linksFactory){

	if(!linksFactory.getIsLog()){
		$location.path('links');
	}

	let newLink = this;
	newLink.link = {url:"", description:""};
	newLink.created = false;

	newLink.sendLink = ()=>{
		
		$http.post("/graphql",
			{
				query: GraphQL.mutations.createLink(newLink.link.url, newLink.link.description, linksFactory.getUserData().id)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					newLink.created = true;
					let tempUserData = linksFactory.getUserData();
					tempUserData.links.push(data.data.createLink);
					linksFactory.setUserData(tempUserData);
					$timeout(()=>{
						newLink.created = false;
					},2500);
				}
				else{
					newLink.created = false;
					console.error(data.errors[0].message);
				}

				newLink.link.url = newLink.link.description = "";

			});
	}

	newLink.goMyLinks = ()=>{
		$location.path('myLinks');
		$scope.$parent.$parent.index.currentSection = linksFactory.setCurrentSection(3);
	}

})