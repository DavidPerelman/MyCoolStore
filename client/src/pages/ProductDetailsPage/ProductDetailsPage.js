import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleProductQuery } from '../../hooks/useProductsQuery';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import classes from './ProductDetailsPage.module.css';
import Rating from '../../components/UI/Rating/Rating';
import Carousel from '../../components/UI/Carousel/Carousel';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { isLoading, error, data: product } = useSingleProductQuery(productId);

  let content;

  if (product) {
    content = (
      <Row className={classes.row}>
        <Col>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>{product.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Carousel images={product.images} />
        </Col>
      </Row>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <Row className={classes.row}>
        <LoadingSpinner />
      </Row>
    );
  }

  console.log(product);

  return (
    <div>
      {content}
      {/* <Container>{content}</Container> */}
    </div>
  );
};

export default ProductDetailsPage;
