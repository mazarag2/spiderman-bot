"use strict";

class spidermanDBDAO {


    async createNewUser (user){

        var createUserQuery = `INSERT INTO public.users (id,name) VALUES($1,$2)`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });
       await pool.query(createUserQuery,[user.getId(),user.getName()]);

    }
    async createSpidermanEvent (user,msg){

        var createSpiderEvent = `INSERT INTO public.spiderevent (user_id,msg,dateposted) VALUES($1,$2,$3)`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });
       let timestamp = new Date();
       console.log(timestamp);
       await pool.query(createSpiderEvent,[user.getId(),msg,timestamp]);

    }
    async updateSpiderProfile(user,msg){

        var createSpiderEvent = `INSERT INTO public.spiderprofile (user_id,spiderman_count,milesmorales_count) VALUES($1,$2,$3) 
        on conflict (user_id) 
        DO UPDATE SET spiderman_count = spiderprofile.spiderman_count + 1,milesmorales_count = spiderprofile.milesmorales_count + $3`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });

       let milesmoralesCount = 0; 
       if(msg.includes('miles') || msg.includes('morales')){
        milesmoralesCount = 1;
       } 
       let spidermanCount = 1;
       await pool.query(createSpiderEvent,[user.getId(),spidermanCount,milesmoralesCount]);

    }

}
module.exports = spidermanDBDAO;