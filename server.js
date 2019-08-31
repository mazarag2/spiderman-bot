let Discord = require('discord.js');
const dotenv = require('dotenv').config();
let express = require("express");
app = express();
let port = process.env.PORT || 8080;
app.listen(port);
var logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

let bot = new Discord.Client();

bot.login(process.env.token);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', async function (message) {

    
    let messageContents = message.content;
    if (messageContents.includes('spiderman')) {
       
        console.log('spiderman detected !');
        console.log(`from ${message.author.username}`);

    }
    if (messageContents.includes('miles morales')){

        message.channel.send('I run better than I Swing',{file : './public/milesmorales.gif'});
    }
    if(messageContents.includes('Raimi') && (messageContents.includes('sucks') || messageContents.includes('sucked'))){

        await message.reply(process.env.spidermanURL);

     }
     if(messageContents.includes('CTR') && messageContents.includes('perfectly') && messageContents.includes('balanced')){

        await message.reply(process.env.spidermanURL);

     }
     if((messageContents.includes('Im') && messageContents.includes('You')) || (messageContents.includes('Im SpiderMan'))){

        await message.reply('Hmm',{file : './public/yourepointingatme.gif'});
     }
     if(messageContents.includes('pizza')){

        await message.reply(process.env.pizzaTimeURL);

     }


});