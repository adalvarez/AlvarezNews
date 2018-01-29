var app = angular.module('ANews');

app.controller('myLinks-ctrl', function($http, $location, $scope){
	let parent = $scope.$parent.$parent.index;

	if(!parent.isLog){
		$location.path('links');
	}

	let myLinks = this;
	myLinks.links = parent.userData.links;
	myLinks.userData = parent.userData;

})