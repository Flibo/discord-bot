const Discord = require('discord.js');
const auth = require('./auth.json');

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Logged in!');
});

bot.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

bot.login(auth.token);