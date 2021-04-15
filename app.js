const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI =
    "mongodb+srv://netninja:QW4IG8dXLQEveXWQ@node-crash-course.lotvu.mongodb.net/node-crash-course?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// listen for requests
// app.listen(3000);

// middlaware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog 2",
        snippet: "about my new blog",
        body: "more about my new blog",
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
});

app.get('/single-blog', (req, res) => {
    Blog.findById('60784ed184a4005dd0c86385')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/", (req, res) => {
    const blogs = [
        {
            title: "Yoshi finds eggs",
            snippet: "lorem ipsum dolor sit amet consectetur",
        },
        {
            title: "Mario finds stars",
            snippet: "lorem ipsum dolor sit amet consectetur",
        },
        {
            title: "How to defeat bowser",
            snippet: "lorem ipsum dolor sit amet consectetur",
        },
    ];
    res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new Blog" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
