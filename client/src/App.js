import { useEffect, useState } from 'react';
import { useCategoriesQuery } from './hooks/useCategoriesQuery';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import Header from './components/Layout/Header/Header';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
} from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  useEffect(() => {}, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} errorElement={<NotFound />} exact />
        <Route path='/product/:slug' element={<ProductDetailsPage />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
