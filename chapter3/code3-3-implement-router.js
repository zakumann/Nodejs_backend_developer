const http = require("http");
const url = require("url");
http
    .createServer((req, res) => {
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html");

        if(path === "/user"){
            user(req, res);
        }else if (path === "/feed"){
            feed(req, res);
        }else {
            notFound(req, res);
        }
    })
    .listen("3000", () => console.log("Let's create Router!"));

    const user = (req, res) => {
        res.end(`[user] name: andy, age: 30`);
    };

    const feed = (req, res) => {
        res.end(`<ul>
            <li>Picture1</li>
            <li>Picture2</li>
            <li>Picture3</li>
            </ul>
            `);
    };

    const notFound = (req, res) => {
        res.statusCode = 404;
        res.end("404 page not found");
    };