import React from 'react';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import CategoryContainer from '../../components/Layout/CategoryContainer/CategoryContainer';
import Container from 'react-bootstrap/Container';

const Home = () => {
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  if (isLoading) {
    return console.log('Loading...');
  }
  if (isError) {
    return console.log('error...');
  }

  return (
    <>
      <Container>
        {categories?.categories.map((category, i) => {
          return <CategoryContainer key={i} category={category} />;
        })}
      </Container>
    </>
  );
};

export default Home;
