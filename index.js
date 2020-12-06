const Discord = require('discord.js');
const client = new Discord.Client();

const emoji1 = "😄";
const emoji2 = "💩";
const emoji3 = "🥧";


var listEmoji = [emoji1, emoji2, emoji3];
const serverID = "785187351693492246";

client.once('ready', () => {
  console.log('Ready!');
  client.emojis.cache.forEach(emoji => {
    listEmoji.push(emoji.id);
  });
});

client.login('Nzg1MTk0NTExNjY3NDI5NDA3.X80TXw.B-sZMaGaTRznmnaw1OPbteivJx8');

client.on('message', message => {
  if (message.channel.type === 'dm') {
    console.log(listEmoji);
    var numEmojis = listEmoji.length;

    var messageToSend = message.content;
    client.channels.cache.get('614197579650957352').send(messageToSend).then(async sentMessage => {
      try {
        await sentMessage.react(listEmoji[Math.floor(Math.random() * numEmojis)]);
        await sentMessage.react(listEmoji[Math.floor(Math.random() * numEmojis)]);
        await sentMessage.react(listEmoji[Math.floor(Math.random() * numEmojis)]);
      } catch (error) {
        console.error("couldn't load emoji");
      }
    })

    
  }
});