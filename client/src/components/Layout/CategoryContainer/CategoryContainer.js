import React from 'react';
import { useContainerProductsQuery } from '../../../hooks/useProductsQuery';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import classes from './CategoryContainer.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../ProductCard/ProductCard';
import Button from 'react-bootstrap/esm/Button';

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
        <Col sm={6} md={4} lg={3} key={product.id}>
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

  return (
    <div className={classes.CategoryContainer}>
      <div className={classes['categories-button']}>
        <Button>
          Our {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </Button>
      </div>
      <div className={classes.products}>
        <Row className={classes.Row}>{content}</Row>
      </div>
    </div>
  );
};

export default CategoryContainer;
