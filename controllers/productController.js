const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const data = require('../products.json');
const mongoose = require('mongoose');

const getAllProducts = async (req, res) => {
  try {
    // get all products
    const products = await Product.find({}).populate('category');
    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getEditProductsCategory = async (req, res) => {
  try {
    let array = [];

    for (const product in data) {
      array.push(data[product]);
    }

    console.log(array[0]);
    for (let i = 0; i < array[0].length; i++) {
      const newProduct = await new Product({
        id: array[0][i].id,
        title: array[0][i].title,
        description: array[0][i].description,
        price: array[0][i].price,
        rating: array[0][i].rating,
        stock: array[0][i].stock,
        brand: array[0][i].brand,
        category: mongoose.Types.ObjectId(array[0][i].category),
        thumbnail: array[0][i].thumbnail,
        images: array[0][i].images,
      }).save();
    }
    // get all products
    const products = await Product.find({});
    res.json({ products: array });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAllProductsByCategory = async (req, res) => {
  console.log('getAllProductsByCategory: ', req.params.categoryId);
  try {
    // get all products by category
    const categoryId = req.params.categoryId;
    // const categoryName = await Category.findById(categoryId)
    //   .populate('category')
    //   .exec();

    const products = await Product.find({ category: categoryId })
      .populate('category')
      .exec();

    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getSingleProduct = async (req, res) => {
  try {
    // get single product
    const productId = req.params.productId;
    const product = await Product.findById(productId)
      .populate('category')
      .exec();

    res.json({ product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getContainerProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // get all products by category
    const category = await Category.findById({
      _id: categoryId,
    }).exec();

    const products = await Product.find({
      category: category._id,
    })
      .populate('category')
      .limit(4);

    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    // get all products
    const products = await Product.deleteMany({});

    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  deleteAllProducts,
  getAllProductsByCategory,
  getContainerProductsByCategory,
  getEditProductsCategory,
};
