import React from 'react';

const initialState = {inspektList : [],qotList : [], logInfo : []}

const rootReducers = (_state,action) => {
    //state = state to update
    //action = 2 key : type and value

    const state = _state || initialState;
    let nextState;

    switch(action.type){
        case 'SET_STATE' : 
            nextState = {...state,...action.value};
            return nextState;
        default : 
            return state;

    }

}

export default rootReducers