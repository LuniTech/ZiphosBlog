const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require("dotenv").config();
const app = express();
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

app.get('/about', (req,res)=>{
	//res.send(req.params.id)
				//console.log("We here!");
		//console.log(article);
	res.sendFile(__dirname+'/about.html')

	}
)


console.log("Now listening on port 5000...");
app.listen(5000);
