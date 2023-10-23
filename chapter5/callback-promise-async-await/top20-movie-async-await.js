const axios = require("axios");

async function getTop20Movies(){ //Because await is used, async is added.
    const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
    try{
        // Since data is received from the network, wait with await..
        const result = await axios.get(url);
        const { data } = result;
        // Considering as exception there are in data or articleList
        if (!data.articleList || data.articleList.size == 0){
            throw new Error("There are no data.");
        }
        //Pulling ranking and title from data
        const movieInfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        });

        //Show data
        for (let movieInfo of movieInfos){
            console.log(`[${movieInfo.rank}UP] ${movieInfo.title}`);
        }
    } catch (err){
        // Exception handling is wrapped in try catch like the existing code.
        throw new Error(err);
    }
}

getTop20Movies();