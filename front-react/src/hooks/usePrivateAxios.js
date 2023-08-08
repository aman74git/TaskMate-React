import privateAxios from '../api/privateAxios';
import { useEffect } from 'react';
import { useAuth, useRefreshToken, useLogout } from '../hooks';

const usePrivateAxios = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const logout = useLogout();

  useEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (error?.response?.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refresh();
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return privateAxios(originalRequest);
          } catch (error) {
            if (error?.response?.status === 403) {
              await logout('expired');
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return privateAxios;
};

export default usePrivateAxios;
