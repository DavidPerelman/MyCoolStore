import axios from 'axios';

export const createUser = async (username, email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/api/auth/createUser`,
    {
      email: email,
      userName: username,
      password: password,
    }
  );

  const user = response.data;
  return user;
};

export const createToken = async (uid, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/api/auth/loginUser`,
    {
      uid: uid,
      password: password,
    }
  );

  const user = response.data;
  return user;
};

// export const checkUserAuthorized = async (token) => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_API}/api/auth-middleware`,
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   const authorized = response.data;
//   return authorized;
// };

export const fetchCategory = async (categoryId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/api/categories/getCategory/${categoryId}`
  );

  const category = response.data.category.name;
  return category.charAt(0).toUpperCase() + category.slice(1);
};
