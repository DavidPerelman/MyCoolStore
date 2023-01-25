import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchUserOrders, fetchSingleOrderData } from '../api/ordersApi';

export const useGetAllUserOrders = () => {
  const orders = useQuery(['orders'], () => {
    const result = fetchUserOrders();
    return result;
  });
  return orders;
};

export const useGetSingleOrder = (orderId) => {
  const order = useQuery(['order', orderId], () => {
    const result = fetchSingleOrderData(orderId);
    return result;
  });
  return order;
};

// const useOrder = (orderId) => {
//   const session = useContext(Context);
//   const token = session.storedValue.token;
//   const order = useQuery(['order', token, orderId], () => {
//     const result = getOrderDetails(token, orderId);
//     return result;
//   });

//   return order;
// };
