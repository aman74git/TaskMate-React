import { useState, createContext } from 'react';

const UtilsContext = createContext({});

export const UtilsContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <UtilsContext.Provider
      value={{ error, errorMessage, setError, setErrorMessage }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export default UtilsContext;
