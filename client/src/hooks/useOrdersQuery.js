import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchUserOrders } from '../api/ordersApi';

export const useGetAllUserOrders = (userId) => {
  const orders = useQuery(['orders', userId], () => {
    const result = fetchUserOrders(userId);
    return result;
  });
  return orders;
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
