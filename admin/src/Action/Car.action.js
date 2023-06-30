import axios from '../helpers/axios'

export const addCar = (form) => {
    console.log(form)
    return async dispatch => {
        const res = await axios.post('car/create',form)
        console.log(res)
    }
}