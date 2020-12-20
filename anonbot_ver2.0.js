// Global Variables
var common = [];
var anonymousMsg = "";
let msgSender = null;
var emojis = ['🐶', '🐱', '🐭', '🐹']
const channelName = "anonbot";
const config = require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  // A private message from a non-bot user
  if (message.channel.type === 'dm' && !message.author.bot) {
    var senderID = message.author.id
    findCommon(senderID, message.author);
  } else if (message.content.includes("To which server would you")) {
    // addReaction(message);
    null
  }
});

async function findCommon(sentByID, sentByUser) {
  common = [];
  let botGuilds = client.guilds;

  await botGuilds.cache.forEach(guild => {
    guild.members.fetch()
      .then(userID => {
        if (userID.has(sentByID)) {
          common.push(guild);
        }
      })
      .catch(console.error);
  })

  setTimeout(() => {
    let confirm = "To which server would you like to send this message to? ";
    for (i = 0; i < common.length; i++) {
      confirm += "\n" + emojis[i] + common[i].name;
    }
    sentByUser.send(confirm)
  }, 500);
}