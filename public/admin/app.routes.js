angular.module('appRoutes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            //.when('/login', {
            //    templateUrl: 'app/views/pages/login.html'
            //})
            //.when('/signup', {
            //    templateUrl : 'app/views/pages/signup.html'
            //})
            .when('/editProject/:id', {
                templateUrl : 'views/pages/editProject.html'
            })
            .when('/addProject', {
                templateUrl : 'views/pages/addProject.html'
            })
            .when('/allProjects', {
                templateUrl: 'views/pages/allProjects.html'
            })

        $locationProvider.html5Mode(true);
    });