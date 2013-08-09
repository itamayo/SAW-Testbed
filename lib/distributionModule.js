task1 = require("./task");
require("../model/task.model.js");
var sem = require('semaphore')(20);
var events = require('events');
var mongoose = require('mongoose');
var monitor = false;
var tasks = ["sfjskdf","sfjskdf2","sfjskdf6","sfjskdf7","sfjskdf8","sfjskdf9","sfjskdf10","sfjskdf11","sfjskdf12","sfjskdf13","sfjskdf14","sfjskdf15","sfjskdf16","sfjskdf17","sfjskdf18","sfjskdf19","sfjskdf20","sfjskdf21","sfjskdf22","sfjskdf23"];
var id=0;
var initDistribution = function () {

    var that = this;
    var clients = [];
    var t = null;

   this.updateTasks = function (cb) {

        TaskSchemaModel.findAllFreeTask(function (err, docs) {
            if (err) console.log("error:" + err);
           
                tasks = docs;
              
                
                if (tasks.length == 0) that.finished = true;
                if (cb) cb();


          

        });
    }
    this.addTask2Client = function (client_id, cb) {
        
        var lng = tasks.length;
       if (id < lng){
        t = new task1.Task(tasks[id].img, tasks[id].script);
        t.client_id = client_id;
        t.id = tasks[id].id;
        t.script = tasks[id].script;
        t.img = tasks[id].img;
        TaskSchemaModel.newTask4Client(client_id, t.id, function () {
           
        });

        id++;
         cb(JSON.stringify({
            taskid: t.id,
            script: t.script,
            img: t.img
        }));
      
    }

       return ;


    }
    this.removeClient = function (task_id) {
        TaskSchemaModel.setStatusTask(task_id, "not-assigned", function () {
           
        });

    }
    this.setFinishTask = function (task_id, cb, time) {

        TaskSchemaModel.setStatusTask(task_id, "finished", function () {
           
            if (cb) cb();
        }, time);

    }
    this.reset = function (client_id) {
        TaskSchemaModel.reset();
        id=0;
    }
    this.changetask = function (taskname) {
        TaskSchemaModel.changeTask(taskname);
       
    }


}
module.exports.initDistribution = initDistribution;