var app = angular.module('ANews');

app.controller('myLinks-ctrl', function($http, $location, $scope){
	let parent = $scope.$parent.$parent.index;

	if(!parent.isLog){
		$location.path('links');
	}

	let myLinks = this;
	myLinks.links = parent.userData.links;
	myLinks.userData = parent.userData;

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
				// This action remove the local link, 
				// this link is a reference to all the links (in main section)
				findAndRemove(myLinks.links,'id', link.id);
			});
	}

})