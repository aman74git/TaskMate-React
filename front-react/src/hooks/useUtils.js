import { useContext } from 'react';
import UtilContext from '../context/UtilsContext';

const useUtils = () => {
  const { error, errorMessage, setError, setErrorMessage } =
    useContext(UtilContext);
  return { error, errorMessage, setError, setErrorMessage };
};

export default useUtils;
