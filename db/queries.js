const winston = require('winston');

module.exports = class BotQueries {
  constructor(db) {
    this.db = db;
  }

  async getUser(discord_id) {
    const text = `
      SELECT good_boy_points FROM bot.users
      WHERE discord_id = $1;
    `;
    const values = [discord_id];

    try {
      const res = await this.db.query(text, values);
      return res.rows;
    } catch(error) {
      winston.error(`Error when getting user: ${error}`);
      throw error;
    }
  }

  async createUser(discord_id) {
    const text = `
      INSERT INTO bot.users
      VALUES ($1, 1);
    `;
    const values = [discord_id];

    try {
      await this.db.query(text, values);
    } catch(error) {
      winston.error(`Error when creating user: ${error}`);
      throw error;
    }
  }

  async incrementBalance(discord_id, amount=1) {
    const text = `
      UPDATE bot.users
        SET good_boy_points = good_boy_points + $2
      WHERE discord_id = $1;
    `;
    const values = [discord_id, amount];

    try {
      await this.db.query(text, values);
    } catch(error) {
      winston.error(`Error when incrementing user balance: ${error}`);
      throw error;
    }
  }
};