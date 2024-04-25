import axios from '../api/axios';
import useAuth from './useAuth';

const useRefresh = () => {

    const refresh = async () => {
        
            const res = await axios.get('/refresh', {
                withCredentials: true
            });
            console.log(res.data.accessToken)
            return res.data.accessToken;
    }
    return  refresh;
}

export default useRefresh;


