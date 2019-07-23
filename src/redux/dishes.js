import { DISHES } from '../shared/dishes';
// import { actionTypes } from 'react-redux-form';

export const Dishes = (state = DISHES, action) => {
    switch(action.type){
        default:
            return state;
    }
}