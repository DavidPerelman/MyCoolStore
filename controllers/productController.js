const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const getAllProducts = async (req, res) => {
  try {
    // get all products
    const products = await Product.find({});
    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAllProductsByCategory = async (req, res) => {
  try {
    // get all products by category
    const categoryId = req.params.categoryId;
    const categoryName = await Category.findById(categoryId).exec();

    const products = await Product.find({ category: categoryName.name }).exec();

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
    const product = await Product.findById(productId).exec();

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
      category: category.name,
    }).limit(4);

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
};
