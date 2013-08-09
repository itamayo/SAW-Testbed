var GenericDocumentModel, TaskSchema, document_model_for_mimetype, extend, log4js, logging, mongoose;
var sem = require('semaphore')(20);
log4js = require('log4js');

logging = log4js.getLogger(__filename);

logging.setLevel('TRACE');

console.log(__filename, "logging.level =", logging.level);

mongoose = require('mongoose');

extend = require('mongoose-schema-extend');
var connStr = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/tasks';

mongoose.connect(connStr, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});



TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    client_id: String,
    script: String,
    img: String,
    status: String,
    time: Number
});



TaskSchema.statics.findAllFreeTask = function (cb) {
    return this.find({
        "status": "not-assigned"
    }, cb);
  
};

TaskSchema.statics.setStatusTask = function (task_id, _status, cb, time) {
    
    var task = this.findOne({
        id: task_id
    }, function (err, doc) {;
        sem.take(function () {
            doc.status = _status;
            if (time) doc.time = time;
            doc.save();
            sem.leave();
            if (cb) cb();
        });
    });

};
TaskSchema.statics.newTask4Client = function (_client_id, task_id, cb) {
    var task = this.findOne({
        id: task_id
    }, function (err, doc) {
        sem.take(function () {
            doc.client_id = _client_id;
            doc.status = "assigned";
            doc.save();
            sem.leave();
            if (cb) cb();
        });

    });
};
TaskSchema.statics.reset = function (_client_id, task_id) {
    var task = this.find({
        $or: [{
            status: "assigned"
        }, {
            status: "finished"
        }]
    }, function (err, docs) {;
        docs.forEach(function (doc) {
            doc.status = "not-assigned";
            doc.save();
        })
    });
};

TaskSchema.statics.changeTask = function (taskname) {
    var task = this.find(
      function (err, docs) {;
        docs.forEach(function (doc) {
            doc.script = "scripts/"+taskname;
            doc.save();
        })
    });
};

TaskSchemaModel = mongoose.model("TaskSchema", TaskSchema);

document_model_for_mimetype = function (mimetype) {
    return TaskSchema;
};
// for (i=0;i<20;i++){
//  task1=new TaskSchemaModel();
//  task1.id="sfjskdf"+i;
//  task1.client_id="";
//  task1.script="scripts/1.js";
//  task1.img="frame.png";
//  task1.status="not-assigned";
//  task1.save();
// }
exports.version = '0.1.0';

exports.TaskSchema = TaskSchemaModel;