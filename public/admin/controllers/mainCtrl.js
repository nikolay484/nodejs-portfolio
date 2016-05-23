angular.module('mainCtrl', [])
    .controller('MainController', MainController);

function MainController($rootScope, $location) {
    var vm = this;
    vm.loggedIn = 1;
    vm.user = "nikolay";

}