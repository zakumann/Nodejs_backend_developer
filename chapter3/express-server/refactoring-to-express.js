const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Refactoring Router with express.");
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    const user = url.parse(req.url, true).query;

    // Present user name and age from Result value.
    res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

function feed(_, res){
    res.json(`<ul>
    <li>Picture1</li>
    <li>Picture2</li>
    <li>Picture3</li>
    </ul>
    `);
}