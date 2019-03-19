import axios from 'axios';

import { ADD_POST, GET_ERRORS } from './types';
import authReducer from '../reducers/auth.reducer';

//Add Post
export const addPost = postData => dispatch => {
	axios
		.post('/api/posts', postData)
		.then(res =>
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: { errors: err.response.data }
			})
		);
};
