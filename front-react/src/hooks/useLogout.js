import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth, useLoadingBar } from '../hooks';

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  const logout = async (type) => {
    setProgress(30);
    const url = `/auth/logout?type=${type}`;

    await axios.delete(url, {
      withCredentials: true,
    });
    setProgress(80);
    setAuth({
      token: null,
      userName: null,
    });
    navigate('/login');
    setProgress(100);
  };

  return logout;
};

export default useLogout;
