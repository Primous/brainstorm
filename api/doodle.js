var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8888;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var helper = {};
helper.formatCitation = function(_msg,_signal){
	_msg.type = _signal;
	return _msg;
}

io.on('connection',function(socket){
	console.info('conectado');
	socket.on('sendMessage',function(mensagem){
		console.info('recebeu sendMessage');
		socket.emit('newMessage',mensagem);
		if(mensagem.msg.indexOf('#') != -1){
			socket.emit('newCitation',helper.formatCitation(mensagem,"#"));
		}
		if(mensagem.msg.indexOf("@") != -1){
			socket.emit('newCitation',helper.formatCitation(mensagem,"@"));
		}
		if(mensagem.msg.indexOf('$') != -1){
			socket.emit('newCitation',helper.formatCitation(mensagem,"$"));
		}
	});
});
