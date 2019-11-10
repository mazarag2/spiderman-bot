let Discord = require('discord.js');
const dotenv = require('dotenv').config();
let express = require("express");
app = express();
let port = process.env.PORT || 8080;
app.listen(port);

let axios = require('axios');
var logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

let bot = new Discord.Client();

bot.login(process.env.token);


let GIPHY_KEY = process.env.GIPHY_KEY;

let searchQuery = `spiderman`

let GIPHY_ENDPOINT = process.env.GiphySearch;

bot.on('ready',async  function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', async function (message) {

    console.log(message.mentions._client.user.username);
    let messageContents = message.content;
    if(message.isMentioned(bot.user) && message.author.username !== 'spiderman-bot') {

      let response = await axios.get(`${GIPHY_ENDPOINT}?tag=${searchQuery}&api_key=${GIPHY_KEY}`);
      await message.channel.send(response.data.data.url);

   }
    if (messageContents.includes('miles morales')){

        message.channel.send('I run better than I Swing',{file : './public/milesmorales.gif'});
    }
    if(messageContents.includes('Raimi') && (messageContents.includes('sucks') || messageContents.includes('sucked'))){

        await message.reply(process.env.spidermanURL);

     }
    else if(messageContents.includes('CTR') && messageContents.includes('perfectly') && messageContents.includes('balanced')){

        await message.reply(process.env.spidermanURL);

     }
     else if((messageContents.includes('Im') && messageContents.includes('You')) || (messageContents.includes('Im SpiderMan'))){

        await message.reply('Hmm',{file : './public/yourepointingatme.gif'});
     }
    else if(messageContents.includes('pizza')){

        await message.reply(process.env.pizzaTimeURL);

     }

     


});