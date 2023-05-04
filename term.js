/* const subProcess = require('child_process')
subProcess.exec('ls', (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`The stdout Buffer from shell:\n${stdout.toString()}`)
    console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
  }
}) */


const cp = require('node:child_process');
const n = cp.fork("./fork.js");

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

// Causes the child to print: CHILD got message: { hello: 'world' }
n.send("ssh -i '/home/autohide/Desktop/31/myAwesomeDownloadFolder/u233699_private_key.pem' u233699@web33s.majordomo.ru -p 1022");

