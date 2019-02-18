const zeromq = require('zeromq');
const sock = zeromq.socket('sub');

sock.connect('tcp://127.0.0.1:3000');
sock.subscribe('kitty cats');
console.log('Subscriber connected to port 3000');

sock.on('message', function(topic, message) {
  console.log(
    'received a message related to:',
    topic.toString(),
    'containing message:',
    message.toString()
  );
});

const pubSock = zeromq.socket('pub');

pubSock.bindSync('tcp://127.0.0.1:3000');
console.log('Publisher bound to port 3000');

setInterval(function(){
  console.log('sending a multipart message envelope');
  pubSock.send(['kitty cats', 'meow!']);
}, 500);