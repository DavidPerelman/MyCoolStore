import React from 'react';
import { Link } from 'react-router-dom';
import { useContainerProductsQuery } from '../../../hooks/useProductsQuery';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import classes from './CategoryContainer.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../ProductCard/ProductCard';

const CategoryContainer = ({ category }) => {
  const {
    isLoading,
    error,
    data: products,
  } = useContainerProductsQuery(category._id);

  let content;

  if (products && products.length > 0) {
    content = products.map((product) => {
      return (
        <Col sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      );
    });
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  console.log(products);

  return (
    <div>
      <h1>
        Our {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
      </h1>
      <div className={classes.products}>
        <Row>{content}</Row>
      </div>
    </div>
  );
};

export default CategoryContainer;
