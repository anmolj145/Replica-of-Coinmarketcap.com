import { SET_MODE, SET_COUNTER, SET_DETAIL_DATA, RESET_COUNTER } from './types';

export const setMode = (mode) => dispatch => {
    dispatch({
        type: SET_MODE,
        payload: mode
    })
};

export const setCounter = (counter) => dispatch => {
    dispatch({
        type: SET_COUNTER,
        payload: counter
    })
};

export const setDetailData = (data) => dispatch => {
    dispatch({
        type: SET_DETAIL_DATA,
        payload: data
    })
};

export const resetCounter = (count) => dispatch => {
    dispatch({
        type: RESET_COUNTER,
        payload: count
    })
};