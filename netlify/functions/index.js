require('dotenv').config(); //Try removing this

const express = require('express'); //returns a function
const app = express(); //Returns an object of type Express
app.use(express.json()); //Allows our server to accept JSON parsing as a body in POST command or so.
const fs = require('fs');

//const path = require('path');

//const serverless = require('serverless-http');

module.exports.handler = async function (event, context) { 

const bot_Import = require('./to_frontend/telegrafAPI');

const botMod =  bot_Import.bot;
const bToken =  bot_Import.botToken;
const _url =  bot_Import.hookUrl;

console.log("Token:", bToken);
console.log("URL:", _url);
console.log("Dir name_1:", __dirname);

const repo = bot_Import.kBoards.daBase;

app.use(botMod.webhookCallback("/" + bToken));
botMod.telegram.setWebhook(_url + bToken); // Run this once to connect the webhook.
botMod.startWebhook("/" + bToken, null, null); //To start the webhook.

app.get('/', async (req, res) => {
    console.log("Welcome to this endpoint!");
    res.send("Hello World, Welcome to my deta base.");
}); 

app.get('/logs', async (req, res) => {
    console.log("Logs endpoint!");
    res.send(repo.dbLogs);
    //res.send(bot_Import.rawDb);
});

app.get('/db', async (req, res) => {
    console.log("DB endpoint!", "Reading DB...");
    
    fs.readFile("./netlify/functions/to_backend/DB.json", "utf8", (err, jsonString) => {
        if(err) console.log("DB read failed!", err); //Try again.
        else if(!err){
            try {
                console.log("DB read successfully");
                res.send(JSON.parse(jsonString));
            } catch (error) {
                console.log("Error parsing JSON string after reading DB: ", error);
            }
        }
    });
});

return {
    statusCode: 200,
    body: "Working"
  }

}

/*
const router = express.Router();

router.get("/", (req, res) => {
    res.join({
        "hello": "hi!"
    });
});

app.use('/.netlify/functions/api', router);*/


//module.exports = app;
//module.exports.handler = async function (event, context) { app }

/*
const port = 8085;
app.listen(port, () => console.log(`Listening at ${port}`));
botMod.launch();*/


/* 
,
    "start": "./node_modules/.bin/netlify-lambda serve src",
    "build": "./node_modules/.bin/netlify-lambda build src"
     */