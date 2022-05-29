const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const NodeWebcam = require('node-webcam')

const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setPresence({
        game: { name: "Staring out Pat's window" },
        status: 'online',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);

const synchronizeSlashCommands = require('discord-sync-commands');
synchronizeSlashCommands(client, [
    {
        name: 'ping',
        description: 'Replies with Pong'
    }, {
        name: 'server',
        description: 'Replies with Server info'
    }, {
        name: 'window',
        description: "Takes a picture of Pat's Window"
    }
], {
    debug: true,
});



var opts = {

    //Picture related

    width: 640,

    height: 480,

    quality: 100,

    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60

    frames: 60,


    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows

    delay: 0,

    //Save shots in memory

    saveShots: true,

    // [jpeg, png] support varies
    // Webcam.OutputTypes

    output: "png",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "location",


    //Logging

    verbose: false

};

const Webcam = NodeWebcam.create(opts);

setInterval(() => {
    Webcam.capture("window", function (err, data) {
        console.log(err, data)
    });

}, 30 * 1000)
