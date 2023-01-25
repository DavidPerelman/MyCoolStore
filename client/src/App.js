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
import { CartContextProvider } from './store/cart-context';
import { OrderContextProvider } from './store/order-context';
import CategoryProductsPage from './pages/CategoryProductsPage/CategoryProductsPage';
import { useContext, useEffect } from 'react';
import AuthContext from './store/auth-context';
import ProfileDashboard from './pages/ProfileDashboard/ProfileDashboard';
import MyOrders from './pages/MyOrders/MyOrders';
import OrderDetailsPage from './pages/OrderDetailsPage/OrderDetailsPage';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.currentUser !== null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} errorElement={<NotFound />} exact />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route
          path='/products/:categoryId'
          element={<CategoryProductsPage />}
          exact
        />
        {isLoggedIn && (
          <Route path='/:userId/my-orders' element={<MyOrders />} />
        )}
        {isLoggedIn && (
          <Route path='/order/:orderId' element={<OrderDetailsPage />} />
        )}
        {isLoggedIn && (
          <Route path='/:userId/dashboard' element={<ProfileDashboard />} />
        )}
        <Route path='/*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div>
      <OrderContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartContextProvider>
      </OrderContextProvider>
    </div>
  );
}

export default App;
