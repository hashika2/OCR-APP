import {REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS, LOGIN_FAIL} from '../action/Type';

const initialState = {
    isRegistered:'',
    isAuthanticated: false,
    loading: true,
}

export default (state=initialState,action) => {
    const {type,payload} = action

    switch (type) {
        case REGISTER_SUCCESS:
            return{
                ...state,isRegistered:payload,loading:false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,isAuthanticated:payload,loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return{
                ...state,isAuthanticated:false,loading:false
            }
        default: 
            return state
            
    }
}


