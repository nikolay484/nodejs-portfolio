'use strict';

angular.module('myApp.about', [
    'ngRoute'
])

.controller('AboutCtrl', AboutCtrl);
function AboutCtrl($scope, $rootScope, $cookies, $log) {
    $log.debug('aboutCTRL start');
    $rootScope.curPath = 'about';
    $log.debug('aboutCTRL stop');
}