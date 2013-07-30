client=function (_ip){
	var id=crypto.randomBytes(20).toString('hex');
	var ip=_ip;
	var task=null;
	var latency=0;
	var socket=null;
	var setTask=function (task){
		this.task=task;
	}
	var setSocket=function (socket){
		this.socket=socket;
	}
}