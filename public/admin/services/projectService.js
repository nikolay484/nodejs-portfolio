var baseurl = '/admin';

angular.module('projectService', [])

    .factory('Project' , function($http) {

        var projectFactory = {};

        projectFactory.allProjects = function() {
            return $http.get('/api/projects');
        }

        projectFactory.create = function(projectData) {
            return $http.post('/api/projects', projectData);
        }
        projectFactory.getProjectById = function(id) {
            return $http.get('/api/projects/' + id);
        }
        projectFactory.updateProjectById = function(id, projectData) {
            return $http.patch('/api/projects/' + id, projectData);
        }
        projectFactory.deleteProjectById = function(id) {
            return $http.delete('/api/projects/' + id);
        }


        return projectFactory;
    })
    .factory('socketio', function($rootScope) {
        var socket = io.connect();
        return {
            on : function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args)
                    });
                });
            },
            emit : function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if(callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });