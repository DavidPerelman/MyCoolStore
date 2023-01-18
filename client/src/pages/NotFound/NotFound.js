import React from 'react';
import { useRouteError } from 'react-router-dom';
import classes from './NotFound.module.css';
const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className={classes.NotFound} id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
};

export default NotFound;
