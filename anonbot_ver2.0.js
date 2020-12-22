// Global Variables
var common = [];
var anonymousMsg = "";
var senderID = "";
var emojis = ['🐶', '🐱', '🐭', '🐹', '🐻', '🐼']
const channelName = "anonbot";
const config = require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.once('ready', () => {
  console.log('Ready!');
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'Send me a message you\'d like to be anonymous!',
      type: 'PLAYING',
      url: "https://github.com/KevinNha/Discord-Anonymous-Bot"
    }
  })
});

client.on('message', message => {
  // A private message from a non-bot user
  if (message.channel.type === 'dm' && !message.author.bot) {
    console.log("Received a message");
    senderID = message.author.id
    anonymousMsg = message.content;
    findCommon(senderID, message.author);
  } else if (message.content.includes("To which server would you")) {
    for (i = 0; i < common.length; i++) {
      message.react(emojis[i]);
    }
    selectReaction(message);
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

function selectReaction(message) {
  const filter = (reaction, user) => {
    return emojis.includes(reaction.emoji.name) && user.id === senderID;
  };
  message.awaitReactions(filter, {
      max: 1,
      time: 60000,
      error: ['time']
    })
    .then(collected => {
      const reaction = collected.first();

      for (i = 0; i < common.length; i++) {
        if (reaction.emoji.name === emojis[i]) {
          sendMessage(common[i].id, anonymousMsg)
        }
      }
    })
    .catch(() => {
      console.log("You took too long to respond.");
    })
}

function sendMessage(serverID, message) {
  let guild = client.guilds.cache.get(serverID);
  const channel = guild.channels.cache.find(channel => channel.name.includes(channelName))
  channel.send(message);
}