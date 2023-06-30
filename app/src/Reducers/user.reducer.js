import { authConstants } from "../Actions/Constants";

const initialState = {
    
    loading: false,
    error: null,
    message:''
}

export default (state = initialState,action)=>{
    console.log(action);
    switch(action.type){
        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case authConstants.SIGNUP_SUCCESS:
            state={
                ...state,
                loading: false,
                message: action.payload
            }
            break;
        case authConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}