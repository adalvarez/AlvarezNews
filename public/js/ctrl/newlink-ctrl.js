var app = angular.module('ANews');

app.controller('newLink-ctrl', function($http, $location, $scope){
	let parent = $scope.$parent.$parent.index;

	if(!parent.isLog){
		$location.path('links');
	}

	let newLink = this;
	newLink.link = {url:"", description:""};
	newLink.created = false;

	newLink.sendLink = ()=>{
		GraphQL.mutations.createLink(newLink.link.url, newLink.link.description, parent.userData.id)
		$http.post("/graphql",
			{
				query: GraphQL.mutations.createLink(newLink.link.url, newLink.link.description, parent.userData.id)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					newLink.created = true;
				}
				else{
					newLink.created = false;
					console.error(data.errors[0].message);
				}

				newLink.link.url = newLink.link.description = "";

			});
	}

	newLink.goMyLinks = ()=>{
		$location.path('links');
	}

})