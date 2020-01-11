import {SET_ALERT, REMOVE_ALERT} from '../action/Type';

const initialState = {
    msg:null,
    type: null,
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch (type) {
        case SET_ALERT:
            return{
                ...state,msg:payload.msg,type:payload.type
            };
        case REMOVE_ALERT:
            return{
                ...state,msg:null,type:null
            }
            
    
        default:
            return state;
            
    }
}