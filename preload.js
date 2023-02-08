var socket = io('localhost:3131');

var form = document.getElementById('form');
var input = document.getElementById('input');

socket.on('out', function(msg) {
  console.log(msg);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
	socket.emit('chat message', input.value);
	input.value = '';
  }
});

const run = async e => {
	
}

//document.getElementById('send').addEventListener('click', run(document.getElementById('input').value));

