const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine(
    "handlebars",
     handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
     }).engine,
    );
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try {
        const [posts, paginator] = await postService.list(collection, page, search);

        // Rendering List page
        res.render("home", { title: "Test Forum", search, paginator, posts });
    }catch (error){
        console.error(error);
        res.render("home", { title: "Test Forum" });
        // Rendering empty value if error detected.
    }
});

app.get("/write", (req, res) => {
    res.render("write", { title: "Test Forum", mode: "create" });
});

app.get("/write", async (req, res) => {
    const post = erq.body;
    // convert result after writing.
    const result = await postService.writePost(collection, post);
    // Use _id of generated Document move to detailed page.
    res.render(`/detail/${result.insertedId}`);
});

app.get("/detail/:id", async(req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});

app.post("/check-password", async (req, res) => {
    // bring id and password
    const { id, password } = req.body;
  
    const post = postService.getPostByIdAndPassword(collection, { id, password });
  
    if (!post) {
      return res.status(404).json({ isExist: false });
    } else {
      return res.json({ isExist: true });
    }
  });
  
  app.get("/modify/:id", async (req, res) => {
    const { id } = req.params.id;
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", { title: "테스트 게시판 ", mode: "modify", post });
  });
  
  app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body;
  
    const post = {
      title,
      writer,
      password,
      content,
      createdDt: new Date().toISOString(),
    };

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
  });

let collection;
app.listen(3000, async () => {
    console.log("Server started");
    // mongoClient, Result of mongodbConnection()
    const mongoClient = await mongodbConnection();
    // Select DB with mongoClient.db() Select collection with collection() and assign to collection.
    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");
});

