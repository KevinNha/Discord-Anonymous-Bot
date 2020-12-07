const Discord = require('discord.js');
const client = new Discord.Client();

const emoji1 = "😄";
const emoji2 = "💩";
const emoji3 = "🥧";

const channelName = "anonbot";

let common = [];

var listEmoji = [];
const serverID = "785187351693492246";

client.once('ready', () => {
  console.log('Ready!');
});

client.login('Nzg1MTk0NTExNjY3NDI5NDA3.X80TXw.hcf885bFv-t64Y3grkWSvd0WJ1o');

client.on('message', message => {

  let user_id = null;
  if (message.channel.type === 'dm' && !message.author.bot) {
    user_id = message.author.id;
    console.log(user_id);
    var messageToSend = message;

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
      guild.members.fetch(user_id).then(_ => {

        guild.members.cache.each(member => {

          if (member.user.id == user_id) {
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
          //here is all common servers

          console.log(common);

          sendMessage("785187351243915265",message.content);
          listEmoji = [emoji1, emoji2, emoji3, emoji1, emoji2]

          let serverIDs = [];
          let serverNames = [];

          for (i = 0; i < common.length; i++) {
            serverIDs.push(common[i].serverID)
            serverNames.push(listEmoji[i] + common[i].serverName + "\n")
          }

          const filter = (reaction, user) => {
            return ['emoji1', 'emoji2'].includes(reaction.emoji.name) && user.id === message.author.id;
          };

          message.author.send("To which server would you like to write to?" + "\n" + serverNames)
            .then(msg => {
              msg.awaitReactions(filter, {
                  max: 1,
                  time: 10000,
                  errors: ['time']
                })
                .then(collected => {
                  const reaction = collected.first();

                  if (reaction.emoji.name === emoji1) {
                    msg.reply("sssdasdasdasd");
                  } else {
                    msg.reply("ioikoijoijoij");
                  }
                })
                .catch(collected => {
                  msg.reply("iwiieieieieieiieqw");
                })
            })
          // .then(react => {
          //   try {
          //     react.react(react1);
          //     react.react(react2);
          //     react.react(react3);
          //   } catch (error) {
          //     console.error("couldnt load emoji");
          //   }
          // })

          var numEmojis = listEmoji.length;


        }

      });
    });



  }

  if (message.author.bot) {
    async message => {
      try {
        await message.react(listEmoji[Math.floor(Math.random() * numEmojis)]);
        await message.react(listEmoji[Math.floor(Math.random() * numEmojis)]);
        await message.react(listEmoji[Math.floor(Math.random() * numEmojis)]);
      } catch (error) {
        console.error("couldn't load emoji");
      }
    }
  }
});


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

function sendMessage(serverID, message){
  let guild = client.guilds.cache.get(serverID);
  const channel = guild.channels.cache.find(channel => channel.name === channelName)
    channel.send(message);
}