import axios from '../api/axios';
import useAuth from './useAuth';

const useRefresh = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        
            const res = await axios.get('/refresh', {
                withCredentials: true
            });
            setAuth(prev => {

                return { ...prev,roles:res.data.roles, 
                    accessToken: res.data.accessToken,
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    id:res.data.id,
                    email:res.data.email

                 }
            });
            return res.data.accessToken;
    }
    return  refresh;
}

export default useRefresh;



