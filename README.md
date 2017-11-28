# discord-bot
Just a simple [Discord](https://discordapp.com/) bot for playing around. The primary purpose of this software is to help me learn the best practices for contemporary JavaScript development. This leads into the fact that this simple bot is heavily over-engineered.

# Dependencies

The aim of this software is to only require [Docker](https://www.docker.com/) as a dependency, but `npm` is used for some scripts on the host (see `package.json`). In case you want to run this software outside Docker, you will need at least [Node](https://nodejs.org/en/) v7.6.0 or use [Babel](https://babeljs.io/) in order to support the `async/await` keywords.

# Running the bot

## Using Docker

```bash
docker-compose up
```
## Without Docker

You have to have PostgreSQL running. Assign environment variables accordingly. Hopefully the code doesn't have hardcoded variables when you are reading this. *Sorry.* Then:
```bash
npm install
npm start
npm run initdb
```
