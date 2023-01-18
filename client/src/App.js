import { useContext, useEffect } from 'react';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import Header from './components/Layout/Header/Header';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthContext from './store/auth-context';
import { CartContextProvider } from './store/cart-context';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} errorElement={<NotFound />} exact />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </div>
  );
}

export default App;
