import axios from '../api/axios';
import useAuth from './useAuth';

const useRefresh = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        
            const res = await axios.get('/refresh', {
                withCredentials: true
            });
            console.log(res.data.accessToken)
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(res.data.accessToken);
                return { ...prev,roles:res.data.roles, 
                    accessToken: res.data.accessToken,
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    id:res.data.id

                 }
            });
            return res.data.accessToken;
    }
    return  refresh;
}

export default useRefresh;



