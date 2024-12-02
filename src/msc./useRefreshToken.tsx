import axios from 'axios';
import useAuth from '../hooks/useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async (): Promise<string> => {
        const response = await axios.get<{ accessToken: string }>('/refresh', {
            withCredentials: true
        });
        setAuth((prev: any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
