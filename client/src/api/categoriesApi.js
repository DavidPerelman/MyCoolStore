import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/categories`
  );
  const categories = response.data;
  return categories;
};

export const fetchCategory = async (categoryId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/categories/getCategory/${categoryId}`
  );

  const category = response.data.category.name;
  return category.charAt(0).toUpperCase() + category.slice(1);
};
