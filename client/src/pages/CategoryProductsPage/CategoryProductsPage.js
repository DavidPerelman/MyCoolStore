import React from 'react';
import classes from './CategoryProductsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryTitleQuery } from '../../hooks/useCategoriesQuery';
import { useContainerProductsQuery } from '../../hooks/useProductsQuery';

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data: categoryName } = useCategoryTitleQuery(categoryId);
  const { data: products } = useContainerProductsQuery(categoryId);

  console.log(products);

  return <h1>{categoryName}</h1>;
};

export default CategoryProductsPage;
