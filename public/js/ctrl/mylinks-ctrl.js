var app = angular.module('ANews');

app.controller('myLinks-ctrl', function($http, $location, $scope, linksFactory){

	if(!linksFactory.getIsLog()){
		$location.path('links');
	}

	let myLinks = this;
	myLinks.userData = linksFactory.getUserData();

	function findAndRemove(array, property, value) {
		array.forEach(function(result, index) {
			if(result[property] === value) {
				array.splice(index, 1);
			}
		});
	}

	myLinks.deleteLink = (link)=>{
		$http.post("/graphql",
			{
				query: GraphQL.mutations.deleteLink(link.id)
			})
			.then((respuesta)=> {
				findAndRemove(myLinks.userData.links,'id', link.id);
				myLinks.userData = linksFactory.setUserData(myLinks.userData);
			});
	}

})