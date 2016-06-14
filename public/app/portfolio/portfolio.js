'use strict';

angular.module('myApp.portfolio', [
    'ngRoute',
    'ngSanitize'
])

    .controller('PortfolioCtrl', PortfolioCtrl)
    .controller('PortfolioPopupCtrl',PortfolioPopupCtrl);

function PortfolioPopupCtrl($scope, $uibModalInstance, projects) {

    $scope.project = projects;
    $scope.data = {
        post: $scope.post
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    
}
function PortfolioCtrl($scope, $rootScope, $cookies, ApiService, $log, $sce, $uibModal, $filter) {
    
    var vm = this;
    vm.category = '';
    vm.posts = '';
    $log.debug('PortfolioCtrl start');
    var postsArr = new Array();
    ApiService.getprojects()
        .success(function(data) {
            vm.projects = data.projects;
        })

    ApiService.getposts()
        .success(function(data) {
            vm.posts = data;
        postsArr = data;
        });
    ApiService.getmedia()
        .success(function(data) {
            vm.media = data;
        });
    ApiService.getCategory()
        .success(function(data) {
            vm.tags = data;
        });
    //vm.getPostByTag = function(data) {
    //    ApiService.getPostTags(data)
    //        .success(function(data) {
    //            vm.test = data;
    //        });
    //};

    $sce.trustAsHtml();
    //  vm.tags  = tags.data;
    // vm.postTags = postTags;
    vm.animationsEnabled = true;

    vm.open_project = function (size) {

        var single_post = $filter('filter')(vm.projects, {_id:size})[0];
        $log.debug(single_post);

        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'portfolioPopup.html',
            controller: 'PortfolioPopupCtrl',
            resolve: {
                projects : function () {
                    return single_post;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            vm.selected = selectedItem;
        }, function () {
            $log.debug('Modal dismissed at: ' + new Date());
        });
    };

    vm.toggleAnimation = function () {
        vm.animationsEnabled = !vm.animationsEnabled;
    };
   
     
    $scope.rowClass = function(posts) {
        
        var string = '';
        angular.forEach(posts.tags, function(value, key) {
            string += value; 
        });
        return string;
    }
    $scope.check = function(post_tag, click_tag) {
        var flag = '';
        angular.forEach(post_tag.tags, function(value, key) {
            if(value == click_tag) {
                flag = true;
            }
        });
        return flag;
    }
    $scope.myFilter = function(val) {
        $scope.filter_tag = val;
    }




    //ApiService.getCategory('uncategorized').then(function(callback) {
    //    vm.category = callback.data;
    //});
    $rootScope.curPath = 'portfolio';
   

    $log.debug('PortfolioCtrl stop');
}

    $(function () {
        var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: 300
        });
        $grid.imagesLoaded().progress( function() {
            $grid.masonry('layout');
        });
        
    });
