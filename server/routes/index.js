var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var BlogController = require('../controllers/blogController');
var ProductController = require('../controllers/productController');
var RecipeController = require('../controllers/recipeController');



router.get('/blog', function (req, res) {
  console.log('getting blogs')
	BlogController.get({})
	.then((blogs) => {
	    res.status(200).send(blogs);
	})
	.catch((err) => {
		  res.status(500).send(err)
	})  
});

router.get('/blog/:id', function (req, res) {

  console.log('getting blogs')
  BlogController.get({_id: req.params.id})
  .then((blogs) => {
    console.log(blogs)
      res.status(200).send(blogs);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});


router.get('/product/:id', function (req, res) {
  console.log('getting product')
  ProductController.get({_id: req.params.id})
  .then((blogs) => {
    console.log('here', blogs[0])
      res.status(200).send(blogs);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});
router.get('/products', function (req, res) {
  let paramObj = {}
  if (req.query.search){
    paramObj.title = {$regex :  new RegExp(req.query.search, "i") }
  }
  console.log(paramObj)
  ProductController.get(paramObj)
  .then((blogs) => {
  
      res.status(200).send(blogs);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});

router.get('/recipe/:id', function (req, res) {
  console.log('getting recipe')
  RecipeController.get({_id: req.params.id})
  .then((recipes) => {
      res.status(200).send(recipes);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});
router.get('/recipes', function (req, res) {
  console.log('getting recipes')
  RecipeController.get()
  .then((recipes) => {
      res.status(200).send(recipes);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});



// router.post('/project', function (req, res) {
//   ProjectController.post(req.body)
//   .then((projects) => {
//       res.status(200).send(projects);
//   })
//   .catch((err) => {
//       res.status(500).send(err)
//   })  
// });

module.exports = router;

