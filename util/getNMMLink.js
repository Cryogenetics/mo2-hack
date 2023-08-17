const getNMMFiles = (url) => {
    return fetch(url).then((response) => {
        return response.text();
    }).then((data) => {
        if(data.includes("This mod contains adult content. You can turn adult content on in your preference, if you wish")) throw new Error("Adult Content");
        return data.split("\n").filter((line) => {
            return line.includes("btn inline-flex") && line.includes("&nmm=1") && (line.includes("https://www.nexusmods.com") || line.includes("ModRequirementsPopUp"))
        })
    })
}

module.exports = { getNMMFiles };
