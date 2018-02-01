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

	myLinks.edit = (event, link)=>{
		if((window.event ? event.keyCode : event.which) === 13){ // Enter
			$http.post("/graphql",
				{
					query: GraphQL.mutations.updateLink(link.id, link.url, link.description)
				})
				.then((respuesta)=> {
					let data = respuesta.data;
					if(data.errors === undefined){
						let tempUserData = linksFactory.getUserData();
						tempUserData.links.forEach((_link)=>{
							if(_link.id===link.id){
								_link.url = link.url;
								_link.description = link.description;
							}
						})
						linksFactory.setUserData(tempUserData);
						link.edit = !link.edit;
					}
				});
		}
	}

})