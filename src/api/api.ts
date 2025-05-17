import axios from 'axios';
import { url } from '../config/url';

// EXAMPLE WITH AUTH
// export const getRandomQuery = (accessToken) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${url}/query`, {
//         params: {},
//         headers: {
//           Authorization: accessToken,
//         },
//       })
//       .then((res) => {
//         resolve(res.data.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

export const sendRandomRequest = async () => {
  try {
    const response = await axios.get(`${url}/`, {
      params: {},
      headers: {},
    });
    return response;
  } catch (error) {
    console.log('Something went wrong', error);
    throw error;
  }
};
