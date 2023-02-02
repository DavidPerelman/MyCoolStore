import React, { lazy, Suspense } from 'react';
import Home from './pages/Home/Home';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { CartContextProvider } from './store/cart-context';
import { OrderContextProvider } from './store/order-context';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import MyNavbar from './components/Layout/MyNavbar/MyNavbar';
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const ProfileDashboard = lazy(() =>
  import('./pages/ProfileDashboard/ProfileDashboard')
);
const OrderDetailsPage = lazy(() =>
  import('./pages/OrderDetailsPage/OrderDetailsPage')
);
const CategoryProductsPage = lazy(() =>
  import('./pages/CategoryProductsPage/CategoryProductsPage')
);
const ProductDetailsPage = lazy(() =>
  import('./pages/ProductDetailsPage/ProductDetailsPage')
);
const MyOrders = lazy(() => import('./pages/MyOrders/MyOrders'));

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.authorized;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MyNavbar />}>
        <Route
          index
          element={<Home />}
          errorElement={
            <Suspense>
              <NotFound />
            </Suspense>
          }
          exact
        />
        <Route
          path='/product/:productId'
          element={
            <Suspense>
              <ProductDetailsPage />
            </Suspense>
          }
        />
        <Route
          path='/products/:categoryId'
          element={
            <Suspense>
              <CategoryProductsPage />
            </Suspense>
          }
          exact
        />
        {isLoggedIn && (
          <Route
            path='/my-orders'
            element={
              <Suspense>
                <MyOrders />
              </Suspense>
            }
          />
        )}
        {isLoggedIn && (
          <Route
            path='/order/:orderId'
            element={
              <Suspense>
                <OrderDetailsPage />
              </Suspense>
            }
          />
        )}
        {isLoggedIn && (
          <Route
            path='/:userId/dashboard'
            element={
              <Suspense>
                <ProfileDashboard />
              </Suspense>
            }
          />
        )}
        <Route
          path='/*'
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
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
