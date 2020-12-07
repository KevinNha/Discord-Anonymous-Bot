// Global Variables
let anonymousMsg = null;
let msgSender = null;

const Discord = require('discord.js');
const client = new Discord.Client();

client.login('Nzg1MTk0NTExNjY3NDI5NDA3.X80TXw.B-sZMaGaTRznmnaw1OPbteivJx8');

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  // Takes the message from user
  if (!message.author.bot) {
    anonymousMsg = message.content
    msgSender = message.author.username

    console.log(msgSender)
  }
  
  
});
