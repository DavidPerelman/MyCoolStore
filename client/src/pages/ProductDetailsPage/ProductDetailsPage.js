import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleProductQuery } from '../../hooks/useProductsQuery';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import classes from './ProductDetailsPage.module.css';
import Rating from '../../components/UI/Rating/Rating';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { isLoading, error, data: product } = useSingleProductQuery(productId);

  let content;

  if (product) {
    content = (
      <Row>
        <Col md={6}>
          <img
            className={classes['img-large']}
            alt={product.title}
            src={product.images[0]}
          />
        </Col>
        <Col md={3}>
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
        {/* <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  console.log(product);

  return <div>{content}</div>;
};

export default ProductDetailsPage;
