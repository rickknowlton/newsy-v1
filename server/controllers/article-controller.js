var Article = require('../models/Articles')

module.exports = {
    find: function (req, res) {
        console.log("Gathering saved articles from the database");
        Article.find().then(function (doc) {
            res.json(doc);
          }).catch(function (err) {
              res.json(err);
            });
      },

    insert: function (req, res) {
        console.log("Adding a saved artice to the database");
        console.log("req.body: ", req.body);
        Article.create(req.body).then(function (doc) {
            res.json(doc);
          }).catch((err)=>{res.json(err)});
      },
    
    delete: function (req, res) {
        console.log("Deleting a saved article from the database");
        Article.remove({
            _id: req.params.id
        }).then(function (doc) {
            res.json(doc);
            console.log("doc: ", doc);
          }).catch((err) =>{res.json(err)});
      }
}