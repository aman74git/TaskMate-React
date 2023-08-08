import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useRefreshToken, useLoadingBar } from '../hooks';

const PersistanceLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { setProgress } = useLoadingBar();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        setProgress(30);
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setProgress(100);
      }
    };
    refreshToken();
  }, []);
  return loading ? <div /> : <Outlet />;
};

export default PersistanceLogin;
