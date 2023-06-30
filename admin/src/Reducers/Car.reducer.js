import { carConstants } from "../Action/Constants"

const initialState = {
    cars:[]
}

export default (state = initialState,action)=>{
    switch(action.type){
        case carConstants.GET_CAR_SUCCESS:
            state = {
                ...state,
                cars: action.payload.cars
            }
            break;
    }
    return state;
}