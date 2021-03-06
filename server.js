let Discord = require('discord.js');
const dotenv = require('dotenv').config();
let express = require("express");
var cors = require('cors')
let app = express();
let port = process.env.PORT || 9090;
app.listen(port);
app.use(cors())
let axios = require('axios');
var logger = require('winston');
const uuidv1 = require('uuid/v1');
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

let bot = new Discord.Client();

bot.login(process.env.token);


let GIPHY_KEY = process.env.GIPHY_KEY;

let searchQuery = `spiderman`

const MotivationQuery = "you can do it";

const INTERVAL_TIME = 86400000;

let GIPHY_ENDPOINT = process.env.GiphySearch;

let spidermanDao = require('./src/dao/spidermanDBDAO');
let User = require('./src/domain/user');
let spiderController = require('./src/controller/spiderController');
let spiderControllerImpl = new spiderController();

app.get('/users',cors(),async (req,res) => { await spiderControllerImpl.getUsers(req,res)});
app.get('/users/:name',cors(),async (req,res) => { await spiderControllerImpl.getUserByName(req,res);});
app.get('/users/:name/events',cors(),async (req,res) => {await spiderControllerImpl.getAllEventsByUser(req,res)});



bot.on('ready',async  function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    let user =  await bot.fetchUser(process.env.tonyID,false);
    await sendMyBoiSomeMotivation(user);
});
bot.on('message', async function (message) {


    let messageContents = message.content;
    if(isMessageSpiderman(messageContents)){

        let discordUser = new User(message.author.username,message.author.id);
        let spiderDao = new spidermanDao();
        await spiderDao.upsertUser(discordUser);
        await spiderDao.createSpidermanEvent(discordUser,messageContents);
        await spiderDao.updateSpiderProfile(discordUser,messageContents);
        
    }

    if(message.isMentioned(bot.user) && message.author.username !== 'spiderman-bot') {

      let response = await axios.get(`${GIPHY_ENDPOINT}?tag=${searchQuery}&api_key=${GIPHY_KEY}`);
      await message.channel.send(response.data.data.url);

    }

    if (messageContents.includes('miles morales')){

        message.channel.send('I run better than I Swing',{file : './public/milesmorales.gif'});
    }
    if(messageContents.includes('Raimi') && (messageContents.includes('sucks') || messageContents.includes('sucked') || messageContents.includes('suck'))){

        await message.reply(process.env.spidermanURL);

     }
    else if(messageContents.includes('CTR') && messageContents.includes('perfectly') && messageContents.includes('balanced')){

        await message.reply(process.env.spidermanURL);

     }
     else if((messageContents.includes('Im You')) || (messageContents.includes('Im SpiderMan'))){

        await message.reply('Hmm',{file : './public/yourepointingatme.gif'});
     }
    else if(messageContents.includes('pizza') || messageContents.includes('Pizza')){

        await message.reply(process.env.pizzaTimeURL);

     }
     if(messageContents.includes('soul') && messageContents.includes('stone')){
         await message.reply(process.env.tobySoulStoneURL);
     }

     


});


async function sendMyBoiSomeMotivation(user) {

    setInterval(async () => {
        
        let response = await axios.get(`${GIPHY_ENDPOINT}?tag=${MotivationQuery}&api_key=${GIPHY_KEY}`);
        await user.send(response.data.data.url);

    },INTERVAL_TIME,user)
}

function isMessageSpiderman(messageContents){
    return messageContents.includes('spiderman') || (messageContents.includes('spider') && messageContents.includes('man'));
}