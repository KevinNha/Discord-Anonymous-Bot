
const Discord = require('discord.js');
const client = new Discord.Client();

const emoji1 = "😄";
const emoji2 = "💩";
const emoji3 = "🥧";

let common = [];


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

  let user_id = null;
  if (message.channel.type === 'dm' && !message.author.bot) {
    user_id = message.author.id;
    console.log(user_id);

    let count = 0;
    client.guilds.cache.forEach(counting =>{
      count++;
    });
    let lastGuild = null;
    let innerCounter = 0;
    client.guilds.cache.forEach(guild =>{
      innerCounter++;
      if(innerCounter == count){
        lastGuild = guild;
      }
    });

    client.guilds.cache.forEach(guild => {
      guild.members.fetch(user_id).then(_ =>{
        

        guild.members.cache.each(member=>{

          if (member.user.id == user_id){
            let toAdd = {
              "serverID": guild.id,
              "serverName": guild.name,
              "userID": member.user.id,
              "userName": member.user.username
            };

            addCommon(toAdd);
          }
        });

        if(lastGuild == guild){
          //here is all common servers

          console.log(common);
        }

      });
    });


    
    var react1 = listEmoji[Math.floor(Math.random() * numEmojis)];
    var react2 = listEmoji[Math.floor(Math.random() * numEmojis)];
    var react3 = listEmoji[Math.floor(Math.random() * numEmojis)];
    message.author.send("To which server would you like to write to?").then(async react => {
      try {
        await react.react(react1);
        await react.react(react2);
        await react.react(react3);
      } catch (error) {
        console.error("couldnt load emoji");
      }
    })

    var numEmojis = listEmoji.length;

    if (!message.author.bot) {
      var messageToSend = message;
    }

    client.channels.cache.get('785187351693492246').send(messageToSend).then(async sentMessage => {
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


function addCommon(element){
  let serverID = element["serverID"];
  let add = true;
  common.forEach(server =>{
    if(server["serverID"] == serverID){
      add = false;
    }
  });
  if(add){
    common.push(element);
  }
}