import React from 'react';
import { useUtils } from '../hooks';

const ErrorBar = () => {
  const { error, errorMessage } = useUtils();
  return error ? (
    <div
      className='alert alert-danger fade show d-flex align-items-center'
      role='alert'
    >
      <i className='bi bi-exclamation-triangle-fill me-4' />
      <div>Error: {errorMessage}</div>
    </div>
  ) : (
    ''
  );
};

export default ErrorBar;
