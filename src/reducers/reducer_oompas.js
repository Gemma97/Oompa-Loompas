import { FETCH_OOMPAS } from '../actions/index';

const INITIAL_STATE = { all: [], oompa: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_OOMPAS:
        return { ...state, all: action.payload.data };
    default:
        return state;
    }
}