const getNMMFiles = (url) => {
    return fetch(url).then((response) => {
        return response.text();
    }).then((data) => {
        if(data.includes("This mod contains adult content. You can turn adult content on in your preference, if you wish")) throw new Error("Adult Content");
        if(data.includes("This mod has been set to hidden")) throw new Error("Hidden");
        let parsedData = data.split("\n").filter((line) => {
            return line.includes("btn inline-flex") && line.includes("&nmm=1") && (line.includes("https://www.nexusmods.com") || line.includes("ModRequirementsPopUp"))
        })
        parsedData = parsedData.map((line) => {
            if(line.includes("ModRequirementsPopUp")) {
                let fileID = line.match(/href=".*?id=(\d+)/)[1]
                line = `<a href="${url}&file_id=${fileID}&nmm=1">`
            }
            return line
        })
        return parsedData
    })
}

module.exports = { getNMMFiles };