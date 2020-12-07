// Global Variables
let anonymousMsg = null;
let msgSender = null;
let senderID = null;
let common = [];

const Discord = require('discord.js');
const client = new Discord.Client();

client.login('Nzg1MTk0NTExNjY3NDI5NDA3.X80TXw.B-sZMaGaTRznmnaw1OPbteivJx8');

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  // Takes the message from user
  if (message.channel.type === 'dm' && !message.author.bot) {
    anonymousMsg = message.content
    msgSender = message.author.username
    senderID = message.author.id

    getCommon(message);
  }
});

// To get a list of mutual servers
async function getCommon(orignalMessage) {
  let count = 0;
  client.guilds.cache.forEach(counting => {
    count++;
  });
  let lastGuild = null;
  let innerCounter = 0;
  client.guilds.cache.forEach(guild => {
    innerCounter++;
    if (innerCounter == count) {
      lastGuild = guild;
    }
  });
  
  client.guilds.cache.forEach(guild => {
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
        let chooseServer = "To which server would you like to write to?";
        for (i = 0; i < common.length; i++)  {
          chooseServer += "\n" + common[i].serverName;
        }
        orignalMessage.author.send(chooseServer);
      }
    })
  });
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

function sendMessage() {
  
}