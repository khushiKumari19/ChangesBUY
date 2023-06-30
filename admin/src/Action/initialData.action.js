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