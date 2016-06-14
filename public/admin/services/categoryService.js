var baseurl = '/admin';

angular.module('categoryService', [])

    .factory('Category' , function($http) {

        var categoryFactory = {};

        categoryFactory.allCategories = function() {
            return $http.get('/api/categories');
        }

        categoryFactory.create = function(projectData) {
            return $http.post('/api/categories', projectData);
        }
        categoryFactory.getCategoryByName = function(name) {
            return $http.get('/api/categories/' + name);
        }
        categoryFactory.updateCategoryByName = function(category_name, categoryData) {
            return $http.patch('/api/categories/' + category_name, categoryData);
        }
        categoryFactory.deleteCategoryByName = function(category_name) {
            return $http.delete('/api/categories/' + category_name);
        }

        return categoryFactory;
    });