const baseFunc = require('./baseMethods');
const dbLogs = baseFunc.logBox;
const write_cmd = baseFunc.setDB;

//======================================= SCHEMAs
class UserInfo{
    constructor(user_name, first_name, id) {
        this.userName = user_name;
        this.firstName = first_name;
        this.ID = id;
        this.entryDate = new Date().getTime();
        this.has_visor = true;
    }
 }

 class AdminInfo{
    constructor(creator) {
        this.dateAssigned = new Date().getTime();
        this.isCreator = creator;
        this.has_visor = true;
    }
 }

 class Meme{
    constructor(_creator, src, desc){
        this.timeAdded = new Date().getTime();
        this.addedBy = _creator; //Count;
        this.source = src; //Memesource file.
        this.description = desc; //Meme description
        this.has_visor = true;
    }
 }
 //==================================================== SCHEMAs END.


//=================================== DB QUERIES
const registerUser = (aUser) => {
    const newUser = new UserInfo(aUser.username, aUser.first_name, aUser.id);

    baseFunc.setUser(newUser).then((added) => {
            dbLogs["Register user"] = "User added";
            console.log("User added");
    }).catch((error) => {
        dbLogs["Register user"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}


const verifyUser = (aUser) => {
    //Get user inform from db.
    baseFunc.getUser(aUser.id).then((rxUser) => {
        if (rxUser) {
            console.log("User data already exists");
            dbLogs["Snapshot"] = rxUser;
            //console.log("User info: ", rxUser);
        } else if (!rxUser) {
            dbLogs["Snapshot"] = "User not detected.";
            //console.log("User info: ", aUser);
            registerUser(aUser);
        }
    }).catch((error) => {
        dbLogs["Verify user"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}


const assignAdmin = (adminId, isCreator) => {
    const newAdmin = new AdminInfo(isCreator);
    baseFunc.setAdmin(String(adminId), newAdmin).then((added) => {
            dbLogs["Assigned admin"] = "Admin added.";
            console.log("Admin added.");
    }).catch((error) => {
        dbLogs["Assigned admin"] = "This error occured: " + error;
        console.log("This error occured: ", error);
    });
}


const isAdmin = async (adminId) => {
    return baseFunc.getAdmin(adminId);
}


const pushMeme = (creator, source, desc_) => {
    var newMeme = new Meme(creator, source, desc_);

    //appData.memes.push(newMeme);
    fbDB.setMeme(newMeme);
}

const popMeme = (index) => {
    //return appData.memes[index];
    return fbDB.getMeme();
}

const getMemePoolSize = () => {
    return fbDB.memePoolSize();
}
//=======================================================DB QUERIES END.


//=================================== DB INITs
/*
function initDB(){
    const dummyUser = {
        "id": 1355312007,
        "first_name": "Eminem",
        "username": "slimShady",
        "type": "private"
    }
    registerUser(dummyUser);
}
initDB();*/

var theOwner = {
    "id": 1355311995,
    "first_name": "Phenomenal",
    "username": "eizeko",
    "type": "private"
}

var firstAdmin = {
    "id": 1770541911,
    "first_name": 'Mean',
    "username": 'Chime22',
    "type": 'private'
}

//assignAdmin(theOwner.id, true);
//assignAdmin(firstAdmin.id, false);

//pushMeme(1355311995, "https://picsum.photos/200/300/", "Testing... A beautiful photo.");
//pushMeme(1355311995, "https://twitter.com/Jeyjeffrey1/status/1566504571157053448?s=20", "The excuse of traffic never gets old.");
//=======================================================DB INiTs.


module.exports = {
    verifyUser,
    assignAdmin,
    isAdmin,
    pushMeme,
    popMeme,
    getMemePoolSize,
    dbLogs,
    write_cmd,
}