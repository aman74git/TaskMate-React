import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

import '../components/bootstrapOverride.css';
import { useUtils, useLoadingBar } from '../hooks';

import ErrorBar from '../components/ErrorBar';

const Signup = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setError, setErrorMessage } = useUtils();
  const emailRef = useRef();
  const pwdRef = useRef();
  const cnfPwdRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  useEffect(() => {
    setProgress(100);
  }, []);

  useEffect(() => {
    setError(false);
    if (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      email.includes('@') &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password, confirmPassword]);

  const onSignup = async (e) => {
    setProgress(10);
    e.preventDefault();
    emailRef.current.disabled = true;
    pwdRef.current.disabled = true;
    cnfPwdRef.current.disabled = true;
    nameRef.current.disabled = true;
    setDisabled(true);

    const url = '/auth/register';
    const body = { name, email, password };

    setProgress(30);

    try {
      await axios.post(url, body);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setProgress(80);
      navigate('/login');
    } catch (error) {
      setError(true);
      if (error.response.status === 409)
        setErrorMessage('alreday registered, please login');
      else if (error.response.status === 400) setErrorMessage('Missing Fields');
      else setErrorMessage('Unexpected Error, please try again later');
    }

    emailRef.current.disabled = false;
    pwdRef.current.disabled = false;
    cnfPwdRef.current.disabled = false;
    nameRef.current.disabled = false;
    setDisabled(false);

    setProgress(100);
  };

  return (
    <div className='row h-100 justify-content-center align-items-center flex-grow-1'>
      <div className='col-md-8 col-lg-6'>
        <div className='card shadow border-0 rounded-4'>
          <div className='card-body'>
            <ErrorBar />
            <h3 className='card-title mb-4'>SignUp</h3>
            <form onSubmit={onSignup}>
              <div className='mb-3'>
                <label htmlFor='exampleInputName1' className='form-label'>
                  Name
                </label>
                <input
                  ref={nameRef}
                  type='text'
                  className='form-control'
                  id='exampleInputName1'
                  aria-describedby='nameHelp'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className='mb-3'>
                <label
                  htmlFor='exampleInputCnfPassword1'
                  className='form-label'
                >
                  Confirm Password
                </label>
                <input
                  ref={cnfPwdRef}
                  type='password'
                  className='form-control'
                  id='exampleInputCnfPassword1'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Signup;
