var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Blog = require('../models/blog');
var BlogController = require('../controllers/blogController');
var Product = require('../models/product');
var ProductController = require('../controllers/productController');



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


module.exports = router;

