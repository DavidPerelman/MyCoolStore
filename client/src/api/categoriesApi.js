import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get(
    `https://prussian-blue-xerus-cuff.cyclic.app/api/categories`
  );
  const categories = response.data;
  return categories;
};

export const fetchCategory = async (categoryId) => {
  const response = await axios.get(
    `https://prussian-blue-xerus-cuff.cyclic.app/api/categories/${categoryId}`
  );
  const category = response.data.category.name;
  return category.charAt(0).toUpperCase() + category.slice(1);
};
