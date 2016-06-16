angular.module('MyAdminApp', [
    'mainCtrl',
    'projectCtrl',
    'categoryCtrl',
    'skillCtrl',
    'userActions',
    'userService',
    'appRoutes'

]).constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
}).value('mainvalues', {
    loggedIn : false
}).directive('ifCategoryDelete', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>' +
        '  <div class="modal fade" id="CategoryDeleteModal" tabindex="-1" + role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true"> ' +
        '    <div class = "modal-dialog" > ' +
        '      <form name = "form-control" > ' +
        '        <div class = "modal-content" > ' +
        '          <div class="modal-body">' +
        '            <div>You want to delete category : <span>{{ category_name }}</span> ? </div>  ' +
        '            <input type="button" class="btn btn-danger" id="submit" ng-click="okey(category_name)" value="Delete"></input ></td></tr></table> ' +
        '            <input type="button" class="btn btn-success" id="submit" ng-click="cancel()" value="Cancel"></input ></td></tr></table> ' +
        '          </div>' +
        '        </div > ' +
        '      </form>' +
        '    </div > ' +
        '  </div>' +
        '</div > ',
        controller: function ($scope, Category) {
            $scope.okey = function(category_name) {
                Category.deleteCategoryByName(category_name).success(function() {
                    $("#CategoryDeleteModal").modal('hide');
                })
            };


            $scope.cancel = function() {
                $("#CategoryDeleteModal").modal('hide');
            };

            $scope.$watch('category_name', function() {
                if ($scope.category_name) {
                    $("#CategoryDeleteModal").modal('show');
                };
            });
        }
    };
});