const fs = require("fs");
const {CSVToJSON} = require("./util/CSVToJson");
const {getNMMFiles} = require("./util/getNMMLink");
const cp = require("child_process");


const {openAdultContent, sid_develop} = require("./config.json");
const {getNXMData} = require("./util/getNXMLink");

// Dictionary to rewrite keys to nicer format
const dict = {
    "#Mod_Priority": "Priority",
    "#Mod_Name": "Name",
    "#Nexus_ID": "ID",
    "#Mod_Nexus_URL\r": "URL",
    "#Mod_Nexus_URL": "URL",
}

const seenBefore = new Map();
const failedMods = {}

const csvData = fs.readFileSync("modlist.csv", "utf-8");


const JSONdata = Array.from(CSVToJSON(csvData)).map(modEntry => {
    Object.entries(modEntry).map(([key, value]) => {
        if (dict[key]) {
            modEntry[dict[key]] = value.trim();
            delete modEntry[key];
        }
        return modEntry
    });
    // remove modEntry if it has no URL and add it to failedMods
    if (!modEntry.URL){
        failedMods[modEntry.Name] = {reason: "No URL", mod: modEntry.Name};
        return
    }

    modEntry.URL = modEntry.URL.trim() + "?tab=files"
    return modEntry
    }).filter(mod => mod !== undefined);

const promiseArray = [];

JSONdata.forEach(mod => {
    if (seenBefore.has(mod.Name)) {
        failedMods[mod.Name] = {reason: "Duplicate Name", mod: mod.Name};
        return;
    }
    seenBefore.set(mod.Name, mod);
    // continue on error, add mod to failedMods
    promiseArray.push(getNMMFiles(mod.URL).then(async (data) => {
        if(data.length === 0) throw new Error("No file found");
        if(data.length !== 1) throw new Error("More than one file found");
        let parsedURL = data[0].match(/href="(.*)"/)[1];
        if(parsedURL.includes("ModRequirementsPopUp")) throw new Error("ModRequirementsPopUp");
        if(sid_develop !== "sid_develop") parsedURL = await getNXMData(parsedURL, sid_develop);



        cp.exec(`start "" "${parsedURL}"`);
    }).catch((e) => {
        if(e.message === "No file found") return failedMods[mod.Name] = {reason: e.message, mod: mod.Name, url: mod.URL};
        if(e.message==="Adult Content" && !openAdultContent) return failedMods[mod.Name] = {reason: e.message, mod: mod.Name, url: mod.URL};
        // upon failure just open the URL in the browser

        //debug all errors
        // failedMods[mod.Name] = {reason: e.message, mod: mod.Name, url: mod.URL}

        cp.exec(`start "" "${mod.URL}"`);
    }));



});

Promise.allSettled(promiseArray).then(() => {

    console.log("The following mods had an error:");
    console.log(failedMods);

});
