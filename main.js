const {Client, Intents} = require("discord.js");
const Discord = require("discord.js");
const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] } );
const {token} = require("./config.json");
const fs = require("fs");
const music = require('@koenie06/discord.js-music');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const PREFIX = "!";


client.once("ready", () => {
    console.log('Ilpo online')
} );

music.event.on('playSong', (channel, songInfo) => {
	channel.send({ content: `:sunglasses: DJ Ilpo tässä! Nyt soi ***${songInfo.title}***` });
});

music.event.on('addSong', (channel, songInfo) => {
	channel.send({ content: `:sunglasses: ***${songInfo.title}*** Lisätty DJ Ilpon biisijonoon.` });
});

client.on("message", message => {

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command == "ilpo"){
        client.commands.get("ilpo").execute(message, args);
    }
    else if(command == "playOld" || command == "pOld"){
        client.commands.get("playOld").execute(message, args);
    }
    else if(command == "stop"){
        client.commands.get("stop").execute(message);
    }
    else if(command == "play" || command == "p"){
        client.commands.get("play").execute(message, args);
    }
    else if(command == "skip" || command == "s"){
        client.commands.get("skip").execute(message);
    }
    else if(command == "gachi" || command == "g"){
        client.commands.get("gachi").execute(message);
    }
    
})



client.login(token)