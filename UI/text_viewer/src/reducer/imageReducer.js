import {SEND_IMAGE} from '../action/Type';

const initailaState = {
    text:'',
    loadingText: false
}

export default (state=initailaState,action) => {

    const {type,payload} = action;
    switch (type) {
        case SEND_IMAGE:
            return {
                ...state,text:payload,loadingText:true
            }
    
        default:
            return state
    }
}