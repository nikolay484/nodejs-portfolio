var express = require('express');

var Project = require('./../models/projectModel');
var Category = require('./../models/categoryModel');
var Skill = require('./../models/skillsModel');

module.exports = function(app, express, io) {
    var api = express.Router();

    // project routes
    api.route('/projects')
        .post(function(req, res) {
            var project = new Project(req.body);
            io.emit('project', project);
            project.save(function (err, project ) {
                res.json({ message : "project created" });
            });
        })
        .get(function(req, res) {
            Project.find(function(err, projects) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    if(projects.length == 0) {
                        res.json({ error : "no projects" });
                    } else {
                        res.json({ error : false , projects : projects});
                    }

                }
            });
        });
    api.use('/projects/:projectName', function(req, res, next) {

        //Project.findById(req.params.projectId, function(err,project){
        Project.findOne({ title : req.params.projectName}, function(err,project){
            if(err)
                res.status(500).send(err);
            else if(project) {
                req.project = project;
                next();
            }
            else {
                res.json({ error : "no project found" });
            }

        });
    });
    api.route('/projects/:projectName')
        .get(function(req,res){
            res.json(req.project);
        })
        .put(function(req, res) {
            req.project.title = req.body.title;
            req.project.author = req.body.author;
            req.project.genre = req.body.genre;
            req.project.read = req.body.read;
            req.project.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.project);
                }
            });
        })
        .patch(function(req, res) {
            if(req.body._id)
                delete req.body._id;
            for(var p in req.body) {
                req.project[p] = req.body[p];
            }

            req.project.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json({ message : "project updated" });
                    io.emit('project', req.project);
                }
            });

        })
        .delete(function(req, res) {
            req.project.remove(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json({ message : "project deleted" });
                }
            });
            io.emit('project', req.project);
        });

    //category routes
    api.route('/categories')
        .post(function(req, res) {
            var category = new Category(req.body);
            io.emit('category', category);
            category.save(function (err, category ) {
                res.json({ message : "project created" });
            });
        })
        .get(function(req, res) {
            Category.find(function(err, category) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    if(category.length == 0) {
                        res.json({ error : "no categories" });
                    } else {
                        res.json(category);
                    }

                }
            }).sort({date: 'asc'});
        });
    api.use('/categories/:categoryName', function(req, res, next) {

        //Category.findById(req.params.categoryName, function(err,category){
        Category.findOne({ name : req.params.categoryName}, function(err,category){
            if(err)
                res.status(500).send(err);
            else if(category) {
                req.category = category;
                next();
            }
            else {
                res.json({ error : "wrong category name" });
            }

        });
    });
    api.route('/categories/:categoryName')
        .put(function(req, res) {
            req.category.name = req.body.name;
            req.category.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.category);
                }
            });
        })
        .delete(function(req, res) {
            req.category.remove(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json({ message : "category deleted" });
                }
            });
            io.emit('category', req.category);
        });

    //skills routes
    api.route('/skills')
        .post(function(req, res) {
            var skill = new Skill(req.body);
            io.emit('skill', skill);
            skill.save(function (err, skill ) {
                res.json({ message : "Skill created", skill : req.body });
            });
        })
        .get(function(req, res) {
            Skill.find(function(err, skill) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    if(skill.length == 0) {
                        res.json({ error : "no skills" });
                    } else {
                        res.json(skill);
                    }

                }
            }).sort({date: 'asc'});
        });
    api.use('/skills/:skillName', function(req, res, next) {

        // Skill.findById(req.params.skillName, function(err,skill){
        Skill.findOne({ title : req.params.skillName}, function(err,skill){
            if(err)
                res.status(500).send(err);
            else if(skill) {
                req.skill = skill;
                next();
            }
            else {
                res.json({ error : "wrong skill name" });
            }

        });
    });
    api.route('/skills/:skillName')
        .get(function(req,res){
            res.json(req.skill);
        })
        .put(function(req, res) {
            req.skill.name = req.body.name;
            req.skill.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.skill);
                }
            });
        })
        .delete(function(req, res) {
            req.skill.remove(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json({ message : "skill deleted" });
                }
            });
            io.emit('skill', req.skill);
        });
    return api;
};


    


