var baseurl = '/admin';

angular.module('skillService', [])

    .factory('Skill' , function($http) {

        var skillFactory = {};

        skillFactory.allSkills = function() {
            return $http.get('/api/skills');
        }

        skillFactory.create = function(skill) {
            return $http.post('/api/skills', skill);
        }
        skillFactory.getSkillByName = function(skill_name) {
            return $http.get('/api/skills/' + skill_name);
        }
        skillFactory.deleteSkillByName = function(skill_name) {
            return $http.delete('/api/skills/' + skill_name);
        }

        return skillFactory;
    });