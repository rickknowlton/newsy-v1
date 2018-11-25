const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    snippet: String,
    date: Date,
    url: String
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;