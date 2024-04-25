import axios, { Axios } from "axios";

export default  axios.create(

    {
        baseURL:"http://localhost:3500"
    }
)