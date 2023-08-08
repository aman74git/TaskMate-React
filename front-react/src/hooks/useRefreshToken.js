import axios from '../api/axios';
import { useAuth } from '../hooks';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const url = '/auth/refresh';
    const response = await axios.get(url, {
      withCredentials: true,
    });

    const { accessToken, userName } = response.data;
    setAuth({
      token: accessToken,
      userName: userName,
    });
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
