const Discord = require('discord.js');
const { Client: pgClient } = require('pg');
const _ = require('lodash');
const winston = require('winston');

const auth = require('./auth.json');
const botQueries = require('./db/queries');

const bot = new Discord.Client();
const db = new pgClient();
const queries = new botQueries(db);

const UPDATE_INTERVAL = 5000;

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

const updateBalance = async bot => {
  const users = getOnlineUsers(bot);

  // TODO parallelize and consider some sort of in-memory cache for gets
  users.forEach(async user => {
    try {
      const data = await queries.getUser(user);
      if (_.isEmpty(data)) {
        // Create new user
        await queries.createUser(user);
        winston.info('Successfully created a new user');
      } else {
        // Increment existing user's points
        await queries.incrementBalance(user);
      }
    } catch (error) {
      winston.error(`Error when querying DB: ${error}`);
    }

  });
};

bot.on('ready', async () => {
  winston.info('Successfully logged into Discord');

  try {
    await db.connect();
  } catch(error) {
    winston.error(`Error when connecting to DB: ${error}`);
    process.exit(1);
  }

  winston.info('Successfully connected to DB');
  winston.info('Bot ready and running!');

  setInterval(() => updateBalance(bot), UPDATE_INTERVAL);
});

bot.on('message', async message => {
  if (message.content === '!points') {
    try {
      let points = await queries.getUser(message.author.id);
      if (_.has(points, '[0].good_boy_points')) {
        points = points[0].good_boy_points;
      } else {
        throw new Error('DB returned a faulty row');
      }

      const username = message.author.username;

      message.reply(
        `user ${username} has ${points} good boy points :PogChamp:`
      );
    } catch(error) {
      winston.error(`Error when responding to !points: ${error}`);
      message.reply('Something went wrong :FeelsSadMan:');
    }
  }
});

bot.on('disconnect', async () => {
  await db.end();
});

bot.login(auth.token);