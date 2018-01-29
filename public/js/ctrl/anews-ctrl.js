var app = angular.module('ANews');

app.controller('anews-ctrl', function($http, $window){
	let anews = this;

	anews.links = [];

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