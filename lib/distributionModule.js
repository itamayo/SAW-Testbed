task1 = require("./task");
require("../model/task.model.js");
var sem = require('semaphore')(20);
var events = require('events');
var mongoose = require('mongoose');
var monitor = false;
var tasks = [];
var initDistribution = function () {

    var that = this;
    var clients = [];
    var t = null;

    this.updateTasks = function (cb) {

        TaskSchemaModel.findAllFreeTask(function (err, docs) {
            if (err) console.log("error:" + err);
            sem.take(function () {
                tasks = docs;
                console.log(docs);
                sem.leave();
                if (tasks.length == 0) that.finished = true;
                if (cb) cb();


            });

        });
    }

    this.addTask2Client = function (client_id, cb) {
        
        var lng = tasks.length;
        var idx = Math.floor((Math.random() * lng) + 0);
        t = new task1.Task(tasks[idx].img, tasks[idx].script);
        t.client_id = client_id;
        t.id = tasks[idx].id;
        t.script = tasks[idx].script;
        t.img = tasks[idx].img;

        TaskSchemaModel.newTask4Client(client_id, t.id, function () {
            that.updateTasks();
        });


       
        cb(JSON.stringify({
            taskid: t.id,
            script: t.script,
            img: t.img
        }));


    }
    this.removeClient = function (task_id) {
        TaskSchemaModel.setStatusTask(task_id, "not-assigned", function () {
            that.updateTasks();
        });

    }
    this.setFinishTask = function (task_id, cb, time) {

        TaskSchemaModel.setStatusTask(task_id, "finished", function () {
            that.updateTasks();
            if (cb) cb();
        }, time);

    }
    this.reset = function (client_id) {
        TaskSchemaModel.reset();
        this.updateTasks();
    }


}
module.exports.initDistribution = initDistribution;