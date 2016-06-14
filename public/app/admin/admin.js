'use strict';

angular.module('adminApp.admin', ['ngRoute'])

//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider
//  
//}])
.controller('AdminCtrl', AdminCtrl);
function AdminCtrl($scope, $rootScope, $cookies, $log) {

$scope.admin = 'hello';
}