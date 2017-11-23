const Discord = require('discord.js');
const auth = require('./auth.json');
const _ = require('lodash');

const bot = new Discord.Client();

const getOnlineUsers = (bot) => {
    const guildIDs = bot.guilds.map(guild => guild.id);
    let users = [];
    guildIDs.forEach((guildID) => {
        const guild = bot.guilds.get(guildID);
        const guildOnlineUsers = guild.members.filter((user) => {
            return user.presence.status === 'online';
        });
        users = _.concat(users, guildOnlineUsers.map(member => member.id));
    });
    return users;
};

bot.on('ready', () => {
    console.log('Logged in!');
    const users = getOnlineUsers(bot);
    console.log(users);
});

bot.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

bot.login(auth.token);