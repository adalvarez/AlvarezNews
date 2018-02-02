var app = angular.module('ANews');
app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/links.html'
	}).when('/about', {
		templateUrl: '/about.html',
	}).when('/newLink', {
		templateUrl: '/newlink.html',
	}).when('/myLinks', {
		templateUrl: '/myLinks.html',
	}).otherwise({
		redirectTo: '/'
	});
});