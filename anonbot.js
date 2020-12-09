// Global Variables
var anonymousMsg = "";
let msgSender = null;
let senderID = null;
let common = [];
let emojis = ['🐶', '🐱', '🐭', '🐹']
let numEmojis = 0;

const channelName = "anonbot";
const config = require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  // Takes the message from user
  if (message.channel.type === 'dm' && !message.author.bot) {
    anonMsg = message;
    anonymousMsg = message.content;
    msgSender = message.author.username
    senderID = message.author.id
    common = [];
    addReaction(message);
  }
});


async function addReaction(message) {
  await getCommon()
    .then(server => {
      message.author.send(server)
    })
    .catch((data) => {
      console.log(data);
    });
  if (message.author.bot && message.channel.type === 'dm') {
    for (i = 0; i < numEmojis; i++) {
      message.react(emojis[i]);
    }

    const filter = (reaction, user) => {
      return emojis.includes(reaction.emoji.name) && user.id === anonMsg.author.id;
    };

    message.awaitReactions(filter, {
        max: 1,
        time: 60000,
        error: ['time']
      })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === emojis[0]) {
          sendMessage(common[0].serverID, anonymousMsg)
        } else if (reaction.emoji.name === emojis[1]) {
          sendMessage(common[1].serverID, anonymousMsg)
        } else if (reaction.emoji.name === emojis[2]) {
          sendMessage(common[2].serverID, anonymousMsg)
        } else if (reaction.emoji.name === emojis[3]) {
          sendMessage(common[3].serverID, anonymousMsg)
        }
      })
      .catch(collected => {
        console.log("You took too long to respond.");
      })
  }
}

// To get a list of mutual servers
const getCommon = async () => {
  let count = 0;
  client.guilds.cache.forEach(() => {
    count++;
  });
  let lastGuild = null;
  let innerCounter = 0;
  let chooseServer = "";
  await client.guilds.cache.forEach(guild => {
    innerCounter++;
    if (innerCounter == count) {
      lastGuild = guild;
    }
  });

  awaitclient.guilds.cache.forEach(guild => {
    guild.members.fetch(senderID).then(_ => {

      guild.members.cache.each(member => {

        if (member.user.id == senderID) {
          let toAdd = {
            "serverID": guild.id,
            "serverName": guild.name,
            "userID": member.user.id,
            "userName": member.user.username
          };

          addCommon(toAdd);
        }
      });
      if (lastGuild == guild) {
        numEmojis = common.length;
        chooseServer = "To which server would you like to write to?";
        for (i = 0; i < common.length; i++) {
          chooseServer += "\n" + emojis[i] + common[i].serverName;
        }
      }
    })
  });
  if (common.length != 0) {
    return chooseServer
  } else {
    throw new Error("something is wrong.")
  }
}



function addCommon(element) {
  let serverID = element["serverID"];
  let add = true;
  common.forEach(server => {
    if (server["serverID"] == serverID) {
      add = false;
    }
  });
  if (add) {
    common.push(element);
  }
}

function sendMessage(serverID, message) {
  let guild = client.guilds.cache.get(serverID);
  const channel = guild.channels.cache.find(channel => channel.name.includes(channelName))
  channel.send(message);
}