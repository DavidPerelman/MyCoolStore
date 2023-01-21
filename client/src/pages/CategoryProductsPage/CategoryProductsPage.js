import React from 'react';
import classes from './CategoryProductsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryTitleQuery } from '../../hooks/useCategoriesQuery';
import { useProductsQuery } from '../../hooks/useProductsQuery';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../../components/Layout/ProductCard/ProductCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data: categoryName } = useCategoryTitleQuery(categoryId);
  const { isLoading, error, data: products } = useProductsQuery(categoryId);

  console.log(products);

  let content;

  if (products && products.length > 0) {
    content = products.map((product) => {
      return (
        <Col
          sm={6}
          md={4}
          lg={3}
          key={product.id}
          className={classes['product-card']}
        >
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
        <h1>
          {categoryName &&
            categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </h1>
      </div>
      <div className={classes.products}>
        <Row className={classes.Row}>{content}</Row>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
