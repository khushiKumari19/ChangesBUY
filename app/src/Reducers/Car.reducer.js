import { carConstants } from "../Actions/Constants";

const initialState = {
    cars:[],
    carDetails:{},
    loading:false
}

export default (state = initialState,action)=>{
    console.log(action)
    switch(action.type){
        case carConstants.GET_CAR_SUCCESS:
            state = {
                ...state,
                cars: action.payload.cars
            }
            break;
        case carConstants.GET_CAR_DETAILS_BY_ID_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case carConstants.GET_CAR_DETAILS_BY_ID_SUCCESS:
            state={
                ...state,
                loading:false,
                carDetails:action.payload.carDetails,
            }
            break
        case carConstants.GET_CAR_DETAILS_BY_ID_FAILURE:
            state={
                ...state,
                loading:false,
                error: action.payload.error
            }
            break;
    }
    return state;
}