import { SET_MODE, SET_COUNTER, SET_DETAIL_DATA, RESET_COUNTER } from '../action/types';

const initialState = {
    darkMode: false,
    current_counter: 1,
    detail_data: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MODE:
            state.darkMode = action.payload
            return {
                ...state
            };
        case SET_COUNTER:
            state.current_counter = state.current_counter + action.payload
            return {
                ...state
            };
        case SET_DETAIL_DATA:
            state.detail_data = action.payload
            return {
                ...state
            };

        case RESET_COUNTER:
            state.current_counter = action.payload
            return {
                ...state
            };
        default:
            return state;
    }
}