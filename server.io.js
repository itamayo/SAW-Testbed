var express = require('express'),
    app = express.createServer(express.logger()),
    utile = require("./lib/utile"),
    dist = require('./lib/distributionModule'),
    io = require('socket.io').listen(app);

// Configuration

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});



// Routes
var start_time = new Date().getTime();
var end_time = "";
var port = process.env.PORT || 5000; 
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var start_time = 0;
var end_time = 0;
var clients=[];
app.get('/reset', function (req, res) {
    var distrub = new dist.initDistribution();
    distrub.reset();
    res.send('DB reseted');
});
app.get('/start', function (req, res) {
    start_time = new Date().getTime();
    io.sockets.emit('getready', {
        message: "get ready!"
    });
    res.send('testbed started');
});

io.sockets.on('connection', function (connection) {
    
    var distribution = new dist.initDistribution();

    console.log(' Connection ' + connection.remoteAddress);


    connection.client_id = utile.makeid();
    clients.push(connection);
    console.log(' Connection count ' + clients.length);


    connection.on('ready', function (message) {
        distribution.updateTasks(function () {
            distribution.addTask2Client(connection.client_id, function (dat) {
                var json = JSON.parse(dat);
                connection.emit('tasktodo', JSON.stringify({
                    "taskid": json.taskid,
                    "script": json.script,
                    "img": json.img
                }));

            });
        });
    });

    connection.on('taskFinished', function (message) {

        data = JSON.parse(message);
        distribution.setFinishTask(data.taskid, function () {
            if (!distribution.finished) {
                distribution.addTask2Client(connection.client_id, function (dat) {
                    var json = JSON.parse(dat);
                    connection.emit('tasktodo', JSON.stringify({
                        taskid: json.taskid,
                        script: json.script,
                        img: json.img
                    }));
                });
            }
            console.log("acumulate tasks time:", new Date().getTime() - start_time);
        }, data.time);
      

    });

    connection.on('disconnect', function (data) {
        data = JSON.parse(data);
        distribution.removeClient(data.taskid);
        console.log((new Date()) + " Peer disconnected.");
    });


});