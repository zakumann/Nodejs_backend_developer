const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
    .get(url)
    .then((result) => {
        if (result.status != 200){
            throw new Error("Failed request");
        }

        if (result.data){
            return result.data;
        }

        throw new Error("There are no any datas.");
    })
    .then((data) => {
        if (!data.articleList || data.articleList.size == 0){
            throw new Error("There are no any datas");
        }
        return data.articleList;
    })
    .then((articles) => {
        return articles.map((article, idx) => {
            return { title: article.title, rank: idx + 1};
        });
    })
    .then((results) => {
        for (let movieInfo of results){
            console.log(`[${movieInfo.rank}UP] ${movieInfo.title}`);
        }
    })
    .catch((err) => {
        console.log("<<Break out Error>>");
        console.error(err);
    })