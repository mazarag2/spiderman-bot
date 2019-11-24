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
    async getUsers (){

        var getUserByNameQuery = `SELECT * from public.users`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });
       let userResults = await pool.query(getUserByNameQuery);
       console.log(userResults.rows);
       return userResults.rows;


    }
    async getUserByName (userName){

        var getUserByNameQuery = `SELECT id,name,milesmorales_count,spiderman_count from public.users as users
        inner join public.spiderprofile as spprofile on spprofile.user_id = users.id
        where users.name = $1`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });
       let userResults = await pool.query(getUserByNameQuery,[userName]);
       console.log(userResults.rows);
       return userResults.rows[0];

    }
    async getSpiderEventbyUser(username){

        var getSpiderEventByNameQuery = `SELECT * from public.spiderevent as spevent
        inner join public.users as users on users.id = spevent.user_id
        where users.name = $1`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });
       let userResults = await pool.query(getSpiderEventByNameQuery,[username]);
       console.log(userResults.rows);
       return userResults.rows;



    }
    async createSpidermanEvent (user,msg){

        var createSpiderEvent = `INSERT INTO public.spiderevent (user_id,msg,dateposted,uuid) VALUES($1,$2,$3,$4)`;
        const uuidv1 = require('uuid/v1');
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
       await pool.query(createSpiderEvent,[user.getId(),msg,timestamp,uuidv1()]);

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
    async upsertUser(user) {

        var upsertUserQuery = `INSERT INTO public.users (id,name) VALUES($1,$2) 
        on conflict (id) 
        DO UPDATE SET name = users.name`;
        const dotenv = require('dotenv').config();
        let { Pool, Client } = require('pg');
        const pool = new Pool({
            user: process.env.spidermanUser,
            host: process.env.spidermanDBURL,
            database: process.env.spidermanDBName,
            password: process.env.spidermanPswrd,
            port: process.env.spidermanDBPort
        });

       await pool.query(upsertUserQuery,[user.getId(),user.getName()]);

    }

}
module.exports = spidermanDBDAO;