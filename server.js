/*Added stuff*/

const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require("dotenv").config();
const app = express();
//Added code:  ==========================
const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const polly = new AWS.Polly();

async function generatePollyAudio(text) {
  // Use Amazon Polly to generate audio from text
  // Implement the Polly audio generation logic here
  // Return the URL or audio data
}

module.exports = { generatePollyAudio };
//END=======================

let Article = require("./models/article")
let uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})

console.log("Successfully connected to database!")
const articleRouter = require("./routes/articles");
const articleRouter2 = require("./testRoute");
let numnum = require("./exVariable")
app.use(express.urlencoded({extended: false}))
const router = express.Router();
app.use("/Pics",express.static(__dirname+ '/Pics'))
//app.use(express.urlencoded({extended: false}))  //StuffI edited
app.use(methodOverride('_method'))
app.use("/articles",articleRouter);
app.set("view engine", "ejs");

app.get("/", async(req, res) => {
	const articles = await Article.find().sort({createdAt: 'desc'});
  res.render("articles/index",{articles:articles});
});



console.log("Now listening on port 5000...");
app.listen(process.env.PORT || 5000);
