const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('Nzg1MTk0NTExNjY3NDI5NDA3.X80TXw.B-sZMaGaTRznmnaw1OPbteivJx8');

client.on('message', message => {
  if (message.channel.type === 'dm') {
    client.channels.cache.get('785187351693492246').send(message.content);
  }
});