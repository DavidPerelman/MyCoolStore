import axios from 'axios';

export const createOrder = async (userId, orderData) => {
  const bearer_token = `Bearer ${localStorage.getItem('token')}`;

  const config = {
    headers: {
      authorization: bearer_token,
    },
  };
  let data = [];
  let totalPayment = 0;

  for (let i = 0; i < orderData.length; i++) {
    totalPayment += orderData[i].product.price * orderData[i].amount;
    data.push({
      product: orderData[i].product._id,
      productQuantity: orderData[i].amount,
      totalPrice: orderData[i].product.price * orderData[i].amount,
    });
  }

  const response = await axios.post(
    `${process.env.REACT_APP_API}/api/orders/${userId}/create`,
    {
      headers: {
        authorization: bearer_token,
      },
    },
    { orderData: data, userId: userId, totalPayment: totalPayment }
  );
  const order = response.data.order;

  return order;
};

export const fetchUserOrders = async () => {
  const bearer_token = `Bearer ${localStorage.getItem('token')}`;

  const config = {
    headers: {
      authorization: bearer_token,
    },
  };

  console.log(bearer_token);
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/orders/user/all`,
    config
  );
  const orders = response.data.orders;
  return orders;
};

export const fetchSingleOrderData = async (orderId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/orders/${orderId}/get`
  );
  const order = response.data.order;

  return order;
};
