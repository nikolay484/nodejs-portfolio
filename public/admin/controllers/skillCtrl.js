angular.module('skillCtrl', [
        'skillService',
        'angularFileUpload'
    ])
    .controller('AllSkillController', AllSkillController);


function AllSkillController(Skill, socketio) {
    var vm = this;
    vm.skills = new Object();
    Skill.allSkills().success(function(data){
        if(data.error) { vm.error = data.error; vm.skills = false } else { vm.skills = data; vm.error = false }
    });
    vm.delete = function(id) {
        Skill.deleteSkillByName(id).success(function(data) {
            vm.message = data.message;
        })
    }
    vm.create = function() {
        Skill.create(vm.skillData)
            .success(function(data) {
                vm.skillData.name = '';
            });
    };
    socketio.on('skill', function(data) {
        Skill.allSkills().success(function(data){
            if(data.error) { vm.error = data.error; vm.skills = false } else { vm.skills = data; vm.error = false }
        });
    });
}