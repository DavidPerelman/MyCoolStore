import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCategoriesQuery } from './hooks/useCategoriesQuery';
import data from './data.js';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  useEffect(() => {
    console.log(data);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {' '}
        <Route index element={<Home />} errorElement={<NotFound />} exact />
        <Route path='/product/:slug' element={<ProductDetailsPage />} />
        <Route path='/*' element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <div>
        <header>
          <a href='/'>MyCoolStore</a>
        </header>
        <main>
          <RouterProvider router={router}></RouterProvider>
        </main>
      </div>
    </>
  );
}

export default App;
