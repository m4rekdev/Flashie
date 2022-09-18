const { start, log } = require('./utils/logger.js');
start('App', 'Connecting to WebSocket..', 'blue');

//* Importing Config
const config = require('./config.js');

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    allowedMentions: {
        parse: [
            'users',
            'roles',
        ]
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
    ],
});

module.exports = client;

//* Importing Config into the client
Object.keys(config).forEach(async (key) => client[key] = config[key]);

//* Creating Wait Function
client.wait = (time) => new Promise(resolve => setTimeout(resolve, time));

//* Handlers
client.interactions = {};
const { readdirSync } = require('fs');
const names = readdirSync('./handlers/').filter(file => file.endsWith('.js'));
names.forEach(name => require(`./handlers/${name}`)(client));

client.login(client.discordToken);

//* Web server
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization ');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('*', (req, res, next) => {
    if (client.user) return next();
    
    return res.status(500).send({
        status: 500,
        message: 'The client is not available',
    });
});

const { walk } = require('./utils/filesystem');
walk(path.join(__dirname, 'api/routes')).forEach(file => {
    const route = require(file);
    app.use('/', route);
});

app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'You have entered an invalid route!',
    });
});

app.listen(client.serverPort, (error) => {
    if (error) log('API', JSON.stringify(error), 'red');

    log('API', `Listening to http://localhost:${client.serverPort}`, 'green');
});

process.on('uncaughtException', (error) => log('Uncaught Error', error.stack, 'red'))