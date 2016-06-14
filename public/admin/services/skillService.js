var baseurl = '/admin';

angular.module('skillService', [])

    .factory('Skill' , function($http) {

        var categoryFactory = {};

        categoryFactory.allSkills = function() {
            return $http.get('/api/skills');
        }

        categoryFactory.create = function(skill) {
            return $http.post('/api/skills', skill);
        }
        categoryFactory.getSkillByName = function(name) {
            return $http.get('/api/skills/' + name);
        }
        categoryFactory.deleteSkillByName = function(category_name) {
            return $http.delete('/api/skills/' + category_name);
        }

        return categoryFactory;
    });