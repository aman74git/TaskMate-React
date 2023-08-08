import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { useUtils, useAuth, useLoadingBar } from '../hooks';
import '../components/bootstrapOverride.css';

import ErrorBar from '../components/ErrorBar';

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const pwdRef = useRef();
  const { setProgress } = useLoadingBar();

  const { setError, setErrorMessage } = useUtils();
  const { setAuth } = useAuth();

  useEffect(() => {
    setProgress(100);
  }, []);

  useEffect(() => {
    setError(false);
    if (email.length > 0 && password.length > 0 && email.includes('@')) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const onLogin = async (e) => {
    setProgress(30);
    e.preventDefault();
    emailRef.current.disabled = true;
    pwdRef.current.disabled = true;
    setDisabled(true);
    try {
      const url = '/auth/login';
      const body = { email, password };
      const res = await axios.post(url, body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = res.data.acessToken;
      const userName = res.data.userName;

      setEmail('');
      setPassword('');

      setAuth({ token, userName });
      setProgress(80);
    } catch (err) {
      setError(true);
      if (err?.response?.status === 401 || err?.response?.status === 400)
        setErrorMessage(err.response.data.msg);
      else setErrorMessage('Unexpected Error, please try again later');
    }

    emailRef.current.disabled = false;
    pwdRef.current.disabled = false;
    setDisabled(false);
    setProgress(100);
  };

  return (
    <div className='row h-100 justify-content-center align-items-center flex-grow-1'>
      <div className='col-md-8 col-lg-6'>
        <div className='card shadow border-0 rounded-4'>
          <div className='card-body'>
            <ErrorBar />
            <h3 className='card-title mb-4'>Login</h3>
            <form onSubmit={onLogin}>
              <div className='mb-3'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Email address
                </label>
                <input
                  ref={emailRef}
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='exampleInputPassword1' className='form-label'>
                  Password
                </label>
                <input
                  ref={pwdRef}
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='btn btn-dark mt-2'
                disabled={disabled}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
