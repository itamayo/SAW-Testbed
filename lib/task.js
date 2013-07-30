var events = require('events');
var eventEmitter = new events.EventEmitter();
var task=function (img1,script1){
	var id=-1;
	var img=img1;
	var script=script1;
	var status="not-assigned";
	var timeout=6000;
	var client_id=-1;
	var timer=null;
	var assignClient=function (client_id){
		this.client_id=client_id;
		timer=setTimeout(this.disallowClient,this.timeout);
	}
	var setMaxTime=function (time){
		this.timeout=time;
	}
	var changeStatus=function (status){
		this.status=status;
	}
	var disallowClient=function (){
		eventEmitter.emit('timeout',this.client_id);
	}
	this.clearTimer=function(){
		clearTimeout(timer);
	}

}
module.exports.Task=task;
module.exports.eventEmitter=eventEmitter;