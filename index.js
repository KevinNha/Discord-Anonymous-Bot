const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('Nzg1MTk0NTExNjY3NDI5NDA3.X80TXw.B-sZMaGaTRznmnaw1OPbteivJx8');

client.on('message', message => {
  if (message.channel.type === 'dm') {
    client.channels.cache.get('785187351693492246').send(message.content);


  let common = {};
  let user_id = "262525851696889856";

  client.users.fetch(user_id).then(function(res){
    //console.log(res);
    client.guilds.cache.forEach(guild => {
      guild.members.fetch(user_id).then(function(){
        guild.members.cache.each(member=>{
          
          if (member.user.id == user_id){
            common[guild.id] = {
              "serverID": guild.id,
              "serverName": guild.name,
              "userID": member.user.id,
              "userName": member.user.username
            }
          }
        });

        console.log(common);
      });
    });
  });
  }
});