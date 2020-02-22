const Discord = require('discord.js')
const client = new Discord.Client()
const config = require("./config.json")
var fs = require('fs');
const broResponses = ["Bromoscope", "Brodometer", "Brosive", "Brotastical", "Brocomotive", "Bromine", "Brotomobile", "Brosine", "Bromide"]
const helpEmbed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Cooliosis Help Box')
	.setDescription('**Prefix: -**\n**__Commands__**\n`help` gets this box\n`bro` provides you with randomized names to call your bros!\n`ping` test the ping\n`changelog` view the most recent update to the bot\n`dmid` used for chatting with the bot dev through the bot. Use in the chat for more info. (Note: the bot logs all messages for the feature) (BETA)\n`kick` (MODERATOR ONLY) used to kick users.\n`ban` (MODERATOR ONLY) used to ban users.')
	.addField("--Links--", "[Invite this bot](https://discordapp.com/api/oauth2/authorize?client_id=658573471416320011&permissions=8&scope=bot) \n[Join our server](https://discord.gg/bPKeD5C) \n[Donate to us](https://paypal.me/bromoscope)");

const dmid = new Discord.RichEmbed()
	.setColor('#C9C9C9')
	.setTitle('Chat activator')
	.setDescription('Hello, this command will tell you how to chat with the dev of this bot without emailing him or messaging him directly. This is only to use for serious questions about the bot, and should not be used to mess around. Messing around will get you blacklisted and you will no longer be able to chat with the dev. In order to activate the conversation, please insert the code you received after the command prefix, and then type `dmid` after. Format: `[prefix][code]dmid`, for example: `-555555dmid`. It will take up to 12 hours to respond at most. Use wisely. (Still in beta, may or may not work. Please experiement)')

const changelog = new Discord.RichEmbed()
	.setColor('#ff0000')
	.setAuthor('Whisker#6666', 'https://cdn.discordapp.com/attachments/544256245868134410/675434782808735800/Screenshot_2019-08-02-15-00-002.png')
	.setTitle('v2.2.0')
	.setDescription('Kick & ban commands have been added for moderators.')
	.setFooter('February 16, 2020 @ 16:08 EST')

var dt = new Date();

//startup
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
	fs.writeFile("textlog.log", "\nConnected as " + client.user.tag, { flag: 'a+' }, (err) => {
		if (err) throw err;
});
	client.user.setActivity("Active School Shooting")
});

//ping
client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "ping") {
		const m = await message.channel.send(`I don't care. ${Math.round(client.ping)}ms`);
}})

//bro
client.on('message', function (message) {
    if (message.author.bot) return;
    if(message.content.indexOf(config.prefix) !==0) return;
    var args = message.content.substring("!".length).split(" ");
    switch (args[0].toLowerCase()) {
        case "bro":
            var response = broResponses [Math.floor(Math.random()*broResponses .length)];
            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

//help
client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "help") {
		const m = await message.channel.send(helpEmbed);
}})

//changelog
client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "changelog") {
		const m = await message.channel.send(changelog);
}})

//console chat input
let y = process.openStdin()
y.addListener("data", res => {
	let x = res.toString().trim().split(/ +/g)
	client.users.get("458433261958332437").send(x.join(" "));
})

//console chat output
client.on('message', (receivedMessage) => {
	if (receivedMessage.author == client.user) {
		return
	}

console.log("\n" + receivedMessage.author.username + "#" + receivedMessage.author.discriminator + ": " + receivedMessage.content + " || " + "[" + dt + "] " + "<" + receivedMessage.id + "> " + "<" + receivedMessage.channel.id + "/" + "#" + receivedMessage.channel.name + "> " + "<" + receivedMessage.author.id + "/" + receivedMessage.author.username + "#" + receivedMessage.author.discriminator + "> ")
fs.writeFile("textlog.log", "\n" + receivedMessage.author.username + "#" + receivedMessage.author.discriminator + ": " + receivedMessage.content + " || " + "[" + dt + "] " + "<" + receivedMessage.id + "> " + "<" + receivedMessage.channel.id + "/" + "#" + receivedMessage.channel.name + "> " + "<" + receivedMessage.author.id + "/" + receivedMessage.author.username + "#" + receivedMessage.author.discriminator + "> ", { flag: 'a+' }, (err) => {
	if (err) throw err;
});
})

//DM ID
client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "dmid") {
		const m = await message.author.send("3151625");
}})

//DM ID instruction
client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "dmid") {
		const m = await message.author.send(dmid);
	}})

//kick
client.on("message", async message => {
	try {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let reason = args.join(" ").slice(22);

	if(!message.member.hasPermission("ADMINISTRATOR")) return;
	if(!message.member.hasPermission("KICK_MEMBERS")) return;
		
	if(kickedUser.hasPermission("ADMINISTRATOR")) return;
	if(kickedUser.hasPermission("KICK_MEMBERS")) return;
	if(kickedUser.hasPermission("BAN_MEMBERS")) return;

	message.guild.member(kickedUser).kick(reason);

	if(command === "kick") {
		const m = await message.channel.send("User has been kicked successfully.");
		return kickedUser
	}}

	catch {
		console.error('\n<error caught>');
	}
})

//ban
client.on("message", async message => {
	try {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let reason = args.join(" ").slice(22);

	if(!message.member.hasPermission("ADMINISTRATOR")) return;
	if(!message.member.hasPermission("BAN_MEMBERS")) return;
		
	if(bannedUser.hasPermission("ADMINISTRATOR")) return;
	if(bannedUser.hasPermission("KICK_MEMBERS")) return;
	if(bannedUser.hasPermission("BAN_MEMBERS")) return;

	message.guild.member(bannedUser).ban(reason);

	if(command === "ban") {
		const m = await message.channel.send("User has been banned successfully.");
		return bannedUser
	}}

	catch {
		console.error('');
	}
})

client.login(config.token)
