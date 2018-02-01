var app = angular.module("ANews");

app.factory("linksFactory",function(){
	var factory = {};

	factory.isLog = false;
	factory.getIsLog = ()=> factory.isLog;
	factory.setIsLog = (isLog)=> {
		factory.isLog = isLog;
		return factory.isLog;
	};

	factory.userData = {};
	factory.getUserData = ()=> factory.userData;
	factory.setUserData = (userData)=> {
		factory.userData = userData;
		return factory.userData;
	};

	factory.currentSection = 0;
	factory.getCurrentSection = ()=> factory.currentSection;
	factory.setCurrentSection = (currentSection)=> {
		factory.currentSection = currentSection;
		return factory.currentSection;
	};

	return factory;
});