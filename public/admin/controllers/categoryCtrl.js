angular.module('categoryCtrl', ['categoryService'])
    .controller('AllCategoryController', AllCategoryController)
    .controller('AddCategoryCtrl', AddCategoryCtrl)
    .controller('EditCategoryCtrl', EditCategoryCtrl);


function AddCategoryCtrl(Category, $location) {
    var vm = this;
    vm.create = function() {
        Category.create(vm.categoryData)
            .success(function(data) {
                $location.path('/allCategories');
            });
    };
    vm.message = "test";
}
function EditCategoryCtrl(Category, $routeParams, $location) {
    var vm = this;
    var category_name = $routeParams.categoryName;
    console.log($routeParams);
    Category.getCategoryByName($routeParams.categoryName)
        .success(function(data) {
            vm.category = data;
            vm.categoryData = vm.category;
        });

    vm.edit = function() {
        Category.updateCategoryByName(category_name, vm.categoryData)
            .success(function(data) {
                //console.log(data);
                $location.path('/allCategories');

//               vm.stories.push(data);

            });

    };
    vm.delete = function(category_name) {
        Category.deleteCategoryByName(category_name).success(function(data) {
            $location.path('/allCategories');

        })
    }
}
function AllCategoryController(Category, socketio) {
    var vm = this;
    vm.categories = new Object();
    Category.allCategories().success(function(data){
        if(data.error) { vm.error = data.error; vm.categories = false } else { vm.categories = data; vm.error = false }
    });

    vm.delete = function(id) {
        Category.deleteCategoryByName(id).success(function(data) {
            vm.message = data.message;
        })
    }
    socketio.on('category', function(data) {
        Category.allCategories().success(function(data){
            if(data.error) { vm.error = data.error; vm.categories = false } else { vm.categories = data; vm.error = false }
        });
    });

    vm.create = function() {
        Category.create(vm.categoryData)
            .success(function(data) {
                vm.categoryData.name = '';
            });
    };
}