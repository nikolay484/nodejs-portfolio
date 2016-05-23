var express = require('express');

var Project = require('./../models/projectModel');

module.exports = function(app, express, io) {
    var api = express.Router();
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
                        res.json({ message : "no projects" });
                    } else {
                        res.json(projects);
                    }

                }
            });
        });
    api.use('/projects/:projectId', function(req, res, next) {

        Project.findById(req.params.projectId, function(err,project){
            if(err)
                res.status(500).send(err);
            else if(project) {
                req.project = project;
                next();
            }
            else {
                res.status(404).send('no project project');
            }

        });
    });
    api.route('/projects/:projectId')
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
    return api;
};


    


