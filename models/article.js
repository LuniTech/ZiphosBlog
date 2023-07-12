const mongoose= require('mongoose')
const marked = require('marked')
const createDomPurify= require('dompurify')
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)
const articleSchema = new mongoose.Schema({
title:{
type: String,
required: true
},

description:
{
type: String,
required:false
},
markdown:{
type: String,
required: true
},
createdAt:
{
type: Date,
default: Date.now
},
sanitizedHtml:{
type:String
}
})

articleSchema.pre('validate',function(next){
	
	if(this.markdown){
	this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
	}
	else{
		console.log("Error")
	}
	next()
})

module.exports = mongoose.model('Article', articleSchema)