const Category = require('../models/categoryModel');

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
  console.log('getCategory');
  try {
    // get all categories
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).exec();

    console.log(category);
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

module.exports = { getAllCategories, deleteAllCategories, getCategory };
