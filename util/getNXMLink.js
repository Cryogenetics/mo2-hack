// turns out, nexus only needs ur sid_Develop cookie to get the NXM link.

// extremely lazy way to get the needed data to generate NXM links.
const getNXMData = (url, cookie) => {
    return fetch(url, {headers: {"Cookie": `sid_develop=${cookie}`}}).then((response) => {
        return response.text();
    }).then((data) => {
        let filteredData = data.split("\n").filter((line) => {
            return line.includes("nxm")
        }).join("\n")
        return filteredData.match(/nxm:\/\/.*?"/)[0].slice(0, -1)
    })
}

module.exports = { getNXMData };


