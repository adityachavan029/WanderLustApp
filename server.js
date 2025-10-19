const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hi i am root!");
});

//index - users
app.get("/users", (req, res) => {
    res.send("get for  users");
});

//show - users
app.get("/users/:id", (req, res) => {
    res.send("get for show users");
});

//post - users
app.post("/users", (req, res) => {
    res.send("post for show users");
});

//delete - users
app.delete("/users/:id", (req, res) => {
    res.send("delete for show users");
});

//posts routes

//index 
app.get("/posts", (req, res) => {
    res.send("get for  posts");
});

//show
app.get("/posts/:id", (req, res) => {
    res.send("get for show posts");
});

//post 
app.post("/posts", (req, res) => {
    res.send("post for show posts");
});

//delete 
app.delete("/posts/:id", (req, res) => {
    res.send("delete for show posts");
});


app.listen(3000, () => {
    console.log("app is listening on port 3000");
});