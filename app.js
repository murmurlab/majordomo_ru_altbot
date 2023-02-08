const path = require('path')
const fs = require('fs')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('./'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});




const {NodeSSH} = require('node-ssh')

	
  // Function to get current filenames
  // in directory with "withFileTypes"
  // set to "true" 


let names = [];
	

fs.readdirSync(path.resolve("./myAwesomeDownloadFolder"), { withFileTypes: true }).forEach(file => {
	names.push(file.name);
})

var sshs = [];


for(var i = 0; i < names.length; i++)
{
	const ssh = new NodeSSH()
	ssh
	.connect({
		host: "web33s.majordomo.ru",
		username: names[i].split('_')[0],
		privateKeyPath: path.resolve(`./myAwesomeDownloadFolder/${names[i].split('_')[0]}_private_key.pem`),
		port: 1022
	})
	.then(() => {		
		sshs.push(ssh);
	})
	.catch(e=>{
		console.log('bum ey')
	})
}





io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		for(var i = 0; i < sshs.length; i++)
		{
			sshs[i].execCommand(msg, { cwd: '' }).then((result) => {
				socket.emit('out', {1: result.stdout, 2: result.stderr});
			});
		}
	});
  });

server.listen(3131, () => {
  console.log('listening on *:3131');
});



const inp = async e => {

	ssh.execCommand(e, { cwd: '' }).then((result) => {
		console.log('STDOUT: ' + result.stdout);
		console.log('STDERR: ' + result.stderr);
	});
}




