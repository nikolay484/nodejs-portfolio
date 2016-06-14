'use strict';

angular.module('myApp.home', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate'
])
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider
//  
//}])
.controller('HomeCtrl', HomeCtrl)
    .directive('ngFader', function( $interval, ApiService, $sce, $log) {
        function link(scope){
//            ApiService.getgallery().then(function(callback) {
//                 $sce.trustAsHtml();
//                 scope.media = callback;
//                 scope.mediadata = callback.data;
//                 $log.debug(scope.media);
//                 
//             });
            ApiService.getgallery().then(function(callback) {
                $sce.trustAsHtml();
                scope.gallery = callback;
               
                 scope.numberOfImages = scope.gallery.data.length;
            });
            
            //Set your interval time. 4000 = 4 seconds
            scope.setTime = 4000;
          
         
            

            /*****************************************************
             STOP! NO FURTHER CODE SHOULD HAVE TO BE EDITED
             ******************************************************/

                //Pagination dots - gets number of images
            //scope.numberOfImages = scope.length;
         
            scope.dots = function(num) {
                return new Array(num);
            };

            //Pagination - click on dots and change image
            scope.selectedImage = 0;
            scope.setSelected = function (idx) {
                scope.stopSlider();
                scope.selectedImage = idx;
            };

            //Slideshow controls
            scope.sliderBack = function() {
                scope.stopSlider();
                scope.selectedImage === 0 ? scope.selectedImage = scope.numberOfImages - 1 : scope.selectedImage--;
            };

            scope.sliderForward = function() {
                scope.stopSlider();
                scope.autoSlider();
            };

            scope.autoSlider = function (){
                scope.selectedImage < scope.numberOfImages - 1 ? scope.selectedImage++ : scope.selectedImage = 0;
            };

            scope.stopSlider = function() {
                $interval.cancel(scope.intervalPromise);
                scope.activePause = true;
                scope.activeStart = false;
            };

            scope.toggleStartStop = function() {
                if(scope.activeStart) {
                    scope.stopSlider();
                } else {
                    scope.startSlider();
                }
            };

            scope.startSlider = function(){
                scope.intervalPromise = $interval(scope.autoSlider, scope.setTime);
                scope.activeStart = true;
                scope.activePause = false;
            };
            scope.startSlider();

            scope.show = function(idx){
                if (scope.selectedImage==idx) {
                    return "show";
                }
            };

            
        }
              
        return {
            restrict: 'E',
            scope: false,
            template: '<div class="ng-fader">'+
                //images will render here
//            '<ul>' +
//                '<li ng-repeat="gallery in gallery.data"   ng-click="toggleStartStop()" ng-swipe-right="sliderBack()" ng-swipe-left="sliderForward()">'+
//             '<span ng-init="sliderNo = $index"></span>' +
//          //ng-repeat="media in media.data" 
//            
//         //   ng-if="media.id == gallery.featured_image" 
//            '<span ng-repeat="media in media.data track by $index">' +
//                '<img ng-if="media.id == gallery.featured_media"  data-ng-src="{{media.guid.rendered}}" data-ng-alt="{{ sliderNo }}" ng-class="show(sliderNo)"/>'+
//            '</span>' +
//               
//            
//                '</li>' +
//            '</ul>' +
               '<ul>' +
                '<li ng-repeat="gallery in gallery.data"   ng-click="toggleStartStop()" ng-swipe-right="sliderBack()" ng-swipe-left="sliderForward()">'+
             '<span ng-init="sliderNo = $index"></span>' +
          //ng-repeat="media in media.data" 
            
         //   ng-if="media.id == gallery.featured_image" 
           
                '<img data-ng-src="{{gallery.acf.front_gallery}}" data-ng-alt="{{ sliderNo }}" ng-class="show(sliderNo)"/>'+
           
               
            
                '</li>' +
            '</ul>' +
                //pagination dots will render here
            '<div class="ng-fader-pagination">' +
            '<ul>' +
            '<li ng-repeat="gallery in gallery.data" ng-class="{current: selectedImage==$index}" ng-click="setSelected($index)"></li>' +
            '</ul>' +
            '</div>' +
                //controls are here
            '<div class="ng-fader-controls">' +
            '<ul>' +
            '<li ng-click="sliderBack()">' +
            '<i class="ngfader-back"></i>' +
            '</li>' +
            '<li ng-click="stopSlider()">' +
            '<i class="ngfader-pause" ng-class="{\'active\': activePause}"></i>' +
            '</li>' +
            '<li ng-click="startSlider()">' +
            '<i class="ngfader-play"  ng-class="{\'active\': activeStart}"></i>' +
            '</li>' +
            '<li ng-click="sliderForward()">' +
            '<i class="ngfader-forward"></i>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>',
            link: link
        };
    });
function HomeCtrl($scope, $rootScope, $cookies, $log, ApiService, $sce) {
    $log.debug('homeCTRL start');
     
    
    $rootScope.curPath = 'main';
    $log.debug('homeCTRL stop');
}


