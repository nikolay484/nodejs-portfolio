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
            .when('/login' , {
                templateUrl : 'views/userActions/login.html'
            })
            .when('/allUsers' , {
                templateUrl : 'views/userActions/allUsers.html'
            })


        $locationProvider.html5Mode(true);
    })
    .run(function ($rootScope, $location, User, AUTH_EVENTS) {
        $rootScope.$on('$locationChangeStart', function (event,next, nextParams, fromState) {
// console.log(window.localStorage.UserAdminToken);
            if (!User.isAuthenticated()) {
                 $location.path("login");
            } else if(User.isAuthenticated() && $location.$$path == '/login')  {
                $location.path("/");
            }

        });
    });