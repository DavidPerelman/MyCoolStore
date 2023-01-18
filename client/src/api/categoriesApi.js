import axios from 'axios';

export const fetchCategories = async () => {
  // console.log('Fetching categories');
  // const response = await axios.get('/api/categories');
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/categories`
  );
  const categories = response.data;

  // console.log(response.data);

  // console.log('Categories: ', categories);
  return categories;
};

export const fetchCategory = async (categoryId) => {
  // console.log('Fetching categories');
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/categories/${categoryId}`
  );
  const category = response.data.category.name;

  // console.log('Categories: ', categories);
  return category.charAt(0).toUpperCase() + category.slice(1);
};
