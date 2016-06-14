angular.module('projectCtrl', [
'projectService',
    'angularFileUpload'
])
    .controller('AllProjectController', AllProjectController)
    .controller('AddProjectCtrl', AddProjectCtrl)
    .controller('EditProjectCtrl', EditProjectCtrl);


function AddProjectCtrl(Category, Project, $location, FileUploader, $scope) {
    var vm = this;
    vm.projectData = new Object();
    vm.create = function() {
        Project.create(vm.projectData)
            .success(function(data) {
                $location.path('/allProjects');
            });
    };
    var uploader = $scope.uploader = new FileUploader({
        url: '/uploads'
    });
    uploader.onAfterAddingFile = function(fileItem) {
        uploader.uploadAll();
        console.log(fileItem);
        Project.getUploadedImage(fileItem.file.name)
            .success(function(data) {
                vm.image = fileItem.file.name;
                //vm.projectData.push({ img_url : fileItem.file.name})
                vm.projectData.img_url= "/uploads/" + fileItem.file.name;
            });
    };
    Category.allCategories()
        .success(function(data) {
            vm.categories = data;
        });
    vm.remove_image = function() {
        vm.projectData.img_url = false;
    }


}
function EditProjectCtrl(Category, Project, $routeParams, $location, $scope, FileUploader) {
    var vm = this;
    var project_name = $routeParams.projectName;
    Project.getProjectByName($routeParams.projectName)
        .success(function(data) {
            if(data.error) {
                vm.error = data.error;
                vm.projectData = false;
            } else {
                vm.project = data;
                vm.projectData = vm.project;
            }
        });
    vm.remove_image = function() {
        vm.projectData.img_url = false;
    }
    Category.allCategories()
        .success(function(data) {
           vm.categories = data;
        });

    var uploader = $scope.uploader = new FileUploader({
        url: '/uploads'
    });
    uploader.onAfterAddingFile = function(fileItem) {
        uploader.uploadAll();
        console.log(fileItem);
        Project.getUploadedImage(fileItem.file.name)
            .success(function(data) {
                vm.image = fileItem.file.name;
                //vm.projectData.push({ img_url : fileItem.file.name})
                vm.projectData.img_url= "/uploads/" + fileItem.file.name;
            });
    };
    vm.edit = function() {
        Project.updateProjectByName(project_name, vm.projectData)
            .success(function(data) {
                $location.path('/allProjects');
            });
    };
    vm.delete = function(project_name) {
        Project.deleteProjectByName(project_name).success(function(data) {
            $location.path('/allProjects');
        })
    }

}
function AllProjectController(Project, socketio) {
    var vm = this;
    Project.allProjects()
        .success(
            function(data) { if(data.error) { vm.error = data.error; vm.projects = false; } else {vm.projects = data.projects; vm.error = false; } }
        );

    vm.delete = function(id) {
            Project.deleteProjectByName(id).success(function(data) {
                vm.message = data.message;
            })
    }
    socketio.on('project', function(data) {
        Project.allProjects().success(
            function(data) { if(data.error) { vm.error = data.error; vm.projects = false; } else {vm.projects = data.projects; vm.error = false; } }
        );
    });
}