const fs = require('fs');
const path = require('path');  //path.join('/path', 'to', 'test.txt'); // '/path/to/test.txt'
//const file_path = path.join(__dirname, `./netlify/functions/to_backend/DB.json`); __dirname  //`${__dirname}/to_backend/DB.json`

var logBox = {};
var DB = {};

/* var adminDatabase = {};
var userDatabase = {};
var memesDatabase = {};*/

/* DB RW techniques 1). Read, use, write.   2).Read, use, write after a certain time period.  */


//========================DB REFERNCES.
const getDB = async () => {
        fs.readFile("./netlify/functions/to_backend/DB.json", "utf8", (err, jsonString) => {
            if(err) console.log("DB read failed!", err); //Try again.
            else if(!err){
                try {
                    DB = JSON.parse(jsonString);
                    console.log("Entire DB", DB);
                    setDB();
                } catch (error) {
                    console.log("Error parsing JSON string: ", error);
                }
            }
        });
}

const setDB = async () => {
    //Write to DB file
    logBox["Writing"] = "About to write...";
    if (DB) {
        const writingData = JSON.stringify(DB);
        console.log("Commencing write...");
        fs.writeFile("./netlify/functions/to_backend/DB.json", writingData, (err) => {
            if (err) {
                logBox["Writing"] = "Error updating DB file" + err;
                console.log("Error updating DB file", err);
            }
            else if (!err) {
                logBox["Writing"] = "Written successfully.";
                console.log("DB updated successfully");
                return DB;
            }
        });
    }
}

getDB();
//================================================================END OF DB REFERNCES.






//========================DB QUERIES.
const getAdmin = async (adminId) => {
    if(!DB) getDB();
    else if(DB) return DB.admins[adminId];
}

const setAdmin = async (adminId, admin) => {
    DB.admins[adminId] = admin;
    return true;
}




const getUser = async (userId) => {
    if(!DB) getDB();
    else if(DB) return DB.users[userId];
}

const setUser = async (user) => {
    DB.users[user.ID] = user;
    return true;
}




const getMeme = async (memeIndex) => {}

const setMeme = async (aMeme) => {}


const memePoolSize = async() => {}

//================================================================END OF DB QUERIES.



module.exports = {
    setDB,
    getUser,
    setUser,
    getAdmin,
    setAdmin,
    getMeme,
    setMeme,
    memePoolSize,
    logBox
};