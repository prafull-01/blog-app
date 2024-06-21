const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectToMongoDB } = require("./connection");
const cookieParser= require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/auth");
const Blog= require('./models/blog');
const User= require('./models/user');

const app = express();
const port = 3000;

//mongodb connect
connectToMongoDB("mongodb://127.0.0.1:27017/blogify");

//handling form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));


//ejs setting
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  const allBlogs= await Blog.find({});
  const user= await User.findById(req.user);
  res.render("home",{user: user, blogs: allBlogs});
});

app.listen(port, () => {
  console.log("listening on port", port);
});
