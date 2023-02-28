const express = require('express');
const app = express();
const morgan = require("morgan");
const dotenv = require('dotenv');
const userRouter = require("./routes/userRouter");
const robotRouter = require("./routes/robotRouter");

//set ejs views engine
app.set("view engine" , "ejs");

//load environment variables
dotenv.config();

//listening on port
app.listen(process.env.PORT, () => {
    console.log("SERVER CONNECTED")
});

//middelwares and static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//get handlers//

//dashboard router
app.get('/' , (req,res) => {
    res.redirect("/dashboard");
});
app.get("/dashboard",(req,res) => {
    res.render("dashboard", {title: "Dashboard"});
});

//robot route-handler
app.use("/" , userRouter);
app.use("/" , robotRouter);


//error not found page
app.use((req,res) => {
    res.status(404).render("404" , {title:"404"});
});