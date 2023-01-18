import React from 'react';
import { useCategoriesQuery } from '../../hooks/useCategoriesQuery';
import CategoryContainer from '../../components/Layout/CategoryContainer/CategoryContainer';

const Home = () => {
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  if (isLoading) {
    return console.log('Loading...');
  }
  if (isError) {
    return console.log('error...');
  }

  return (
    <main>
      {categories?.categories.map((category, i) => {
        return <CategoryContainer key={i} category={category} />;
      })}
      {/* <div className={classes.products}>{content}</div> */}
    </main>
  );
};

export default Home;
