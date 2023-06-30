import axios from "axios";
import { api } from "../urlConfig"


const axiosIntance = axios.create({
    baseURL: api,
})


export default axiosIntance;