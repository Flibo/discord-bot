const Discord = require('discord.js');
const { Client: pgClient } = require('pg');
const auth = require('./auth.json');
const _ = require('lodash');

const bot = new Discord.Client();
const db = new pgClient();

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

bot.on('ready', async () => {
    console.log('Logged in!');

    try {
        await db.connect();
    } catch(error) {
        console.log(`Error when connecting to DB: ${error}`);
    }

    const res = await db.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message) // Hello world!
    await db.end();

    const users = getOnlineUsers(bot);
    console.log(users);
});

bot.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

bot.login(auth.token);