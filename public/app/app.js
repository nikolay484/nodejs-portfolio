'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.home',
  'myApp.about',
  'myApp.portfolio',
  'ngCookies',
  'ui.bootstrap',
  'ngAnimate'
])
//.config(Config)
.config(function($routeProvider, $locationProvider, $logProvider) {
   $routeProvider
       .otherwise({redirectTo : '/'})
       .when('/', {
            templateUrl: 'homepage/main/main.html',
            controller: 'HomeCtrl'
       })
       .when('/portfolio', {
            templateUrl: 'homepage/portfolio/portfolio.html',
            controller: 'PortfolioCtrl',
            controllerAs: 'portfolio',
            resolve : {
                portfolio_posts: function(ApiService) {
                    return ApiService.getposts();
                },
                media : function(ApiService) {
                    return ApiService.getmedia();
                }
            }
        })
       .when('/about', {
            templateUrl: 'homepage/about/about.html',
            controller: 'AboutCtrl'
        })
        $locationProvider.html5Mode(true);  // need to enable in future
        $logProvider.debugEnabled(true);
})
.value('value',
        {
            site_title : 'Bestvision.co.il - Nothing is impossible',
            site_author : 'Nikolay waysman'
        })
.controller('AppCtrl', AppCtrl)
.factory('ApiService', getApiFactory);
function AppCtrl($scope, value, $cookies) { 
    $scope.author = value.site_author;
    $scope.title = value.site_title;
    
}

function getApiFactory($http) {

    var ApiFactory = {};

        ApiFactory.getposts = function() {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/posts');
        },
        ApiFactory.getmedia = function() {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/media');
        },
        ApiFactory.getmedia1 = function(id) {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/media/' + id);
        },
        ApiFactory.gettags = function() {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/tags');
        },
        ApiFactory.getPostTags = function(id) {
            return $http.get('http://bestvision.co.il/poligon/wp-json/wp/v2/posts/' + id + '/tags');
        },
        ApiFactory.getgallery = function() {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/front_gallery/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ApiFactory.getgallerymedia = function() {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/media/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ApiFactory.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: 'http://bestvision.co.il/poligon/wp-json/wp/v2/categories',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ApiFactory.getCategory = function(cat_name) {
            return $http.get('api/categories/');
        },
        // nodejs api service
        ApiFactory.getprojects = function() {
            return $http.get('/api/projects');
        }


    return ApiFactory;

}

