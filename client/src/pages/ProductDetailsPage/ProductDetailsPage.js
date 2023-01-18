import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { slug } = useParams();

  return <div>{slug}</div>;
};

export default ProductDetailsPage;