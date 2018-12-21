var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Blog = require('../models/blog');
var BlogController = require('../controllers/blogController');
var Product = require('../models/product');
var ProductController = require('../controllers/productController');
var RecipeController = require('../controllers/recipeController');



router.post('/blog', function (req, res) {
  console.log('in the route')
	BlogController.post(req.body)
	.then((blogs) => {
	    res.status(200).send(blogs);
	})
	.catch((err) => {
		  res.status(500).send(err)
	})  
});

router.delete('/blog/:id', function (req, res) {
  req.params.id
  BlogController.delete(req.params.id)
  .then((blogs) => {
      res.status(200).send(blogs);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});

router.put('/blog/:id', function (req, res) {
  
  BlogController.put(req.body)
    .then((blogs) => {
      console.log(blogs)
      res.status(200).send(blogs);
    })
  .catch((err) => {
      res.status(500).send(err)
  })  
});

router.post('/product', function (req, res) {
  console.log('posting product')
  ProductController.post(req.body)
  .then((products) => {

    console.log('products', products)
      res.status(200).send(products);
  })
  .catch((err) => {
    console.log(err)
      res.status(500).send(err)
  })  
});

router.delete('/product/:id', function (req, res) {
  req.params.id
  ProductController.delete(req.params.id)
  .then((blogs) => {
    console.log(blogs)
      res.status(200).send(blogs);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});

router.put('/product/:id', function (req, res) {
  console.log('putting products')
  ProductController.put(req.body)
    .then((blogs) => {
      console.log(blogs)
      res.status(200).send(blogs);
    })
  .catch((err) => {
      res.status(500).send(err)
  })  
});

//recipe
router.post('/recipe', function (req, res) {
  console.log('posting recipe')
  console.log('posting product')
  RecipeController.post(req.body)
  .then((recipe) => {

    console.log('recipe', recipe)
      res.status(200).send(recipe);
  })
  .catch((err) => {
    console.log(err)
      res.status(500).send(err)
  })  
});

router.delete('/recipe/:id', function (req, res) {
  console.log('deleting recipe')
  req.params.id
  RecipeController.delete(req.params.id)
  .then((recipe) => {
    console.log(recipe)
      res.status(200).send(recipe);
  })
  .catch((err) => {
      res.status(500).send(err)
  })  
});

router.put('/recipe/:id', function (req, res) {
  console.log('putting recipe')
  RecipeController.put(req.body)
    .then((recipe) => {
      console.log(recipe)
      res.status(200).send(recipe);
    })
  .catch((err) => {
      res.status(500).send(err)
  })  
});


module.exports = router;

