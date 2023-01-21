import axios from 'axios';

export const fetchContainerProductsByCategory = async (categoryId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/products/category/${categoryId}/4`
  );
  const products = response.data.products;

  return products;
};

export const fetchProduct = async (productId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/products/product/${productId}`
  );
  const product = response.data.product;

  return product;
};

export const fetchAllProductsByCategory = async (categoryId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/products/category/${categoryId}`
  );
  const products = response.data.products;

  return products;
};
