const express = require("express")
require("dotenv").config();
const password = process.env.PASSWORD;
const router = express.Router();
const Article = require("./../models/article");
router.get("/new",(req,res) => {res.render("articles/new",{article: new Article()})})


router.get("/edit/:id",async(req,res) => {
	
	const article = await Article.findById(req.params.id)
	res.render("articles/edit",{article: article})
	
	
	
	})


router.get('/:id', async(req,res)=>{
	//res.send(req.params.id)
	const article = await Article.findById(req.params.id)
	if(article == null){ res.redirect('/');
	console.log('Empty! Failed')
		
	}
	else{
		//console.log("We here!");
		//console.log(article);
	res.render('articles/show', {article : article});
	}
})
router.post('/', async(req,res)=>{
	let article = new Article({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown
		
		
	})
	
	try{
	 if (password !== req.body.password) {
	
    res.render('articles/new', { error: 'Incorrect Password!!Nice try :D' });
  } 
  else {
	  console.log("Password WORKSS!!")
    article = await article.save();
	res.redirect(`/articles/${article.id}`)
  }
}
	
	catch(e)
	{
		
	res.render('articles/new',{article: article})
	}
	
})

/*router.put('/:id',async(req,res)=>{
	req.article = await Article.findById(req.params.id);
	console.log(req.params)
	console.log(req.article)
	let article = req.article;
	article.title = req.body.title;
	article.description = req.body.description;
	article.markdown = req.body.markdown;
	try{
	article = await article.save();
	res.redirect(`/articles/${article.id}`)
	}
	catch(e)
	{
		
	res.render('articles/edit',{article: article})
	}
	
})*/

//Trying out the chatgpt code:
router.put('/:id', async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
     console.log("Our article : ")
	 console.log(article)
    if (!article) {
      // Handle the case where the article is not found
      return res.status(404).send('Article not found');
    }
   if (password !== req.body.password) {
	
    res.render('articles/edit', { error: 'Incorrect Password!!Nice try :D' ,article: article});
  } 

else{
console.log("Password correct!")
console.log("Article === ",article)
    // Update the fields based on user input
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    // Save the changes
    await article.save();

    res.redirect(`/articles/${req.params.id}`);
}
  } catch (err) {
    // Handle any errors that occur during the process
   // console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
//---end of chatgpt code!


router.delete('/:id', async(req, res) =>{
	try{
	 if (password !== req.body.password) {
	const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', { error: 'Incorrect Password!!Nice try :D', articles:articles });
  } 
  else {
	  await Article.findByIdAndDelete(req.params.id);
	res.redirect('/')
	  console.log("works!!")
     }
}
	
	catch(e)
	{
	res.render('articles/index',{article: article})
	}
	
	
})


module.exports = router;