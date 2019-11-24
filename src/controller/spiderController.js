let express = require("express");
app = express();
const dotenv = require('dotenv').config();
let spiderDao = require('../dao/spidermanDBDAO');
let User = require('../domain/user')
class spiderController {

    async getUserByName(req,res){


        let spiderDaoImpl = new spiderDao();
        let name = req.params.name;
        console.log(name);
        let results = await spiderDaoImpl.getUserByName(name);
        res.send(results);

    }
    async getUsers(req,res){

        
        let spiderDaoImpl = new spiderDao();
        let results = await spiderDaoImpl.getUsers();
        res.send(results);
    }

    async getAllEventsByUser(req,res){

        let spiderDaoImpl = new spiderDao();
        let name = req.params.name;
        console.log(name);
        let results = await spiderDaoImpl.getSpiderEventbyUser(name);
        res.send(results);

    }

}
module.exports = spiderController;