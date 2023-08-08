import { useContext } from 'react';
import LoadingBarContext from '../context/LoadingBarContext';

const useLoadingBar = () => {
  const { progress, setProgress } = useContext(LoadingBarContext);
  return { progress, setProgress };
};

export default useLoadingBar;
