import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';
const initialState = {
	isAuthentacated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthentacated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
}
