angular.module('mainCtrl', [])
    .controller('MainController', MainController);

function MainController($rootScope, $location, User, mainvalues) {


    var vm = this;
    if (!User.isAuthenticated()) {
        mainvalues.loggedIn = 0
        vm.loggedIn = mainvalues.loggedIn;
    } else {
        mainvalues.loggedIn = 1
        vm.loggedIn = mainvalues.loggedIn;
    }

    vm.logout = function () {
        User.logout();
        location.reload();
    }

    vm.user = "nikolay";

}