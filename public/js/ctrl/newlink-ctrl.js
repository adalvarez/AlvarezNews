var app = angular.module('ANews');

app.controller('newLink-ctrl', function($http, $location, $scope, $timeout){
	let parent = $scope.$parent.$parent.index;

	if(!parent.isLog){
		$location.path('links');
	}

	let newLink = this;
	newLink.link = {url:"", description:""};
	newLink.created = false;

	newLink.sendLink = ()=>{
		
		$http.post("/graphql",
			{
				query: GraphQL.mutations.createLink(newLink.link.url, newLink.link.description, parent.userData.id)
			})
			.then((respuesta)=> {
				let data = respuesta.data;

				if(data.errors === undefined){
					newLink.created = true;
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
		parent.currentSection = 3;
	}

})