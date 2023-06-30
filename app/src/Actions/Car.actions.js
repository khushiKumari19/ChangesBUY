// import axios from '../helpers'
import axios from '../helpers/axios'
import { carConstants } from './Constants'

export const getInitialData = () => {
    return async dispatch => {
        const res =  await axios.post('/initialData')
        
        console.log('in car actions file',res);
        if(res.status == 200){
            const { cars } = res.data
            dispatch({
                type:carConstants.GET_CAR_SUCCESS,
                payload:{cars}
            })
        }
    }
}

export const getCarDetailsById=(payload)=>{
    return async dispatch => {
        dispatch({type:carConstants.GET_CAR_DETAILS_BY_ID_REQUEST});
        let res;
        try{
            const { carId } = payload.params;
            res = await axios.get(`/car/${carId}`);
            console.log(res)
            dispatch({
                type:carConstants.GET_CAR_DETAILS_BY_ID_SUCCESS,
                payload: {carDetails: res.data.car}
            }) 
        }catch(error){
            console.log(error);
            dispatch({
                type:carConstants.GET_CAR_DETAILS_BY_ID_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}