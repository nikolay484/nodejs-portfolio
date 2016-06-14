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
        projectFactory.getProjectByName = function(name) {
            return $http.get('/api/projects/' + name);
        }
        projectFactory.updateProjectByName = function(project_name, projectData) {
            return $http.patch('/api/projects/' + project_name, projectData);
        }
        projectFactory.deleteProjectByName = function(project_name) {
            return $http.delete('/api/projects/' + project_name);
        }
        projectFactory.uploadProjectImg = function(file) {
            return $http.post('/uploads/' + file);
        }
        projectFactory.getUploadedImage = function(file) {
            return $http.get('/uploads/' + file);
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