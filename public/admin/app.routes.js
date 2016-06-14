angular.module('appRoutes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            //.when('/login', {
            //    templateUrl: 'app/views/pages/login.html'
            //})
            //.when('/signup', {
            //    templateUrl : 'app/views/pages/signup.html'
            //})
            .when('/editProject/:projectName', {
                templateUrl : 'views/projectPages/editProject.html'
            })
            .when('/addProject', {
                templateUrl : 'views/projectPages/addProject.html'
            })
            .when('/allProjects', {
                templateUrl: 'views/projectPages/allProjects.html'
            })
            // category routes
            .when('/allCategories', {
                templateUrl: 'views/categoryPages/allCategories.html'
            })
            .when('/editCategory/:categoryName', {
                templateUrl : 'views/categoryPages/editCategory.html'
            })
            .when('/addCategory', {
                templateUrl : 'views/categoryPages/addCategory.html'
            })
            .when('/allSkills', {
                templateUrl : 'views/skillPages/allSkills.html'
            })


        $locationProvider.html5Mode(true);
    });