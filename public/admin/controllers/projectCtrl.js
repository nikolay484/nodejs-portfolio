angular.module('projectCtrl', ['projectService'])
    .controller('ProjectController', ProjectController)
    .controller('AllProjectController', AllProjectController)
    .controller('AddProjectCtrl', AddProjectCtrl)
    .controller('EditProjectCtrl', EditProjectCtrl);

function ProjectController(Project) {
    Project.allProjects()
        .success(function(data) {
            vm.projects = data;
        });
}
function AddProjectCtrl(Project) {
    var vm = this;
    vm.create = function() {
        Project.create(vm.projectData)
            .success(function(data) {

                // clear up the form
                vm.projectData = {};

                vm.message = data.message;

//               vm.stories.push(data);
            });
    };
    vm.message = "test";
}
function EditProjectCtrl(Project, $routeParams) {
    var vm = this;
    var project_id = $routeParams.id;
    Project.getProjectById($routeParams.id)
        .success(function(data) {
            vm.project = data;
            vm.projectData = vm.project;
        });

    vm.edit = function() {
        Project.updateProjectById(project_id, vm.projectData)
            .success(function(data) {
                console.log(data);

                vm.message = data.message;

//               vm.stories.push(data);
            });
    };
    vm.delete = function(id) {
        Project.deleteProjectById(id).success(function(data) {
            vm.message = data.message;
            vm.projectData = {};
        })
    }
}
function AllProjectController(Project, socketio) {
    var vm = this;
    Project.allProjects().success(function(data){ vm.projects = data; });

    vm.delete = function(id) {
            Project.deleteProjectById(id).success(function(data) {
                vm.message = data.message;
            })
    }
    socketio.on('project', function(data) {
        Project.allProjects().success(function(data){ vm.projects = data; });
    });
}