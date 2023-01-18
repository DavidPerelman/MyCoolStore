import React, { createContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';

const ProductContext = createContext({
  products: [],
  product: null,
  getProduct: (productId) => {},
  createProduct: (product) => {},
  getProductsByCategory: () => {},
  // clearError: () => {},
});

export const ProductContextProvider = (props) => {
  // const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const { isLoading, error, sendRequest: fetchProduct } = useHttp();

  useEffect(() => {
    // getProductsByCategory();
  }, []);

  // const clearError = () => {
  //   setTimeout(() => {
  //     setError(null);
  //   }, 3000);
  // };

  const createProduct = async (product) => {
    // const products = productsJson.products;
    // for (let i = 0; i < products.length; i++) {
    //   console.log(products[i].images);
    //   await addDoc(productsCollectionRef, {
    //     title: products[i].title,
    //     brand: products[i].brand,
    //     category: products[i].category,
    //     description: products[i].description,
    //     price: products[i].price,
    //     thumbnail: products[i].thumbnail,
    //     title: products[i].title,
    //     images: products[i].images,
    //   })
    //     .then(async (product) => {
    //       console.log(product);
    //     })
    //     .catch((err) => {
    //       setError('error!');
    //       clearError();
    //     });
    // }
  };

  const getProduct = async (productId) => {
    const transformProduct = (productObj) => {
      setProduct(productObj.product);
    };

    fetchProduct(
      {
        url: `/api/products/product/${productId}`,
      },
      transformProduct
    );
  };

  const getProductsByCategory = async (category) => {
    // const q = query(
    //   productsCollectionRef,
    //   where('category', '==', `${category}`)
    // );
    // await getDocs(q)
    //   .then((data) => {
    //     data.forEach((doc) => {
    //       console.log(doc.id, ' => ', doc.data());
    //     });
    //   })
    //   .catch((err) => {
    //     setError('error!');
    //     clearError();
    //   });
  };

  const contextValue = {
    products: products,
    product: product,
    getProduct: getProduct,
    createProduct: createProduct,
    getProductsByCategory: getProductsByCategory,
    // clearError: clearError,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
