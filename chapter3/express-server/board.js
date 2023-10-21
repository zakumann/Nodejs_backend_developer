const express = require("express");
const app = express();
let posts = [];

// To use req.body, use middleware of JSON.
// otherwise, convert to the undefined
app.use(express.json());

// If the request is from POST, parse the content-type, which is application/x-www-form-urlencoded.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    const { title, name, text } = req.body;

    // Add new post information to the forum list.
    posts.push({ id: posts.length + 1, title, name, text, createDt: Date()});
    res.json({ title, name, text });
})

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length != filteredPosts.length;
    posts = filteredPosts;
    if (isLengthChanged){
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
});
app.listen(3000, () => {
    console.log("welcome posts START!");
});