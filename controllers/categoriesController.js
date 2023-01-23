const Category = require('../models/categoryModel');
const products = require('../products.json');

const getAllCategories = async (req, res) => {
  try {
    // get all categories
    const categories = await Category.find({});
    res.json({ categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCategory = async (req, res) => {
  try {
    // get all categories
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).exec();

    // return;
    res.json({ category: category });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    // get all products
    const categories = await Category.deleteMany({});

    res.json({ categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const createCategories = async (req, res) => {
  try {
    let array = [];

    for (let i = 0; i < products.products.length; i++) {
      if (!array.includes(products.products[i].category)) {
        array.push(products.products[i].category);
      }
    }

    for (let i = 0; i < array.length; i++) {
      // create a new category
      const newCategory = await new Category({
        name: array[i],
      }).save();
    }

    res.json({ categories: array });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getAllCategories,
  deleteAllCategories,
  getCategory,
  createCategories,
};
