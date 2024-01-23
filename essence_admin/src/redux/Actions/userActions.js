// import axios from 'axios';
// import { usersBaseLink } from '../../utils/API';

// export const getUser = () => (dispatch) => {
//   dispatch({ type: 'GET_USER_PENDING' });
//   axios
//     .get(usersBaseLink)
//     .then((res) => {
//       console.log('resAction', res);
//       dispatch({
//         type: 'GET_USER_SUCCESS',
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({ type: 'GET_USER_FAILED', payload: err.message });
//     });
// };
