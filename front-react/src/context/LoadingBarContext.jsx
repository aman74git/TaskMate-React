import React, { createContext } from 'react';
import LoadingBar from 'react-top-loading-bar';

const LoadingBarContext = createContext({});

export const LoadingBarContextProvider = ({ children }) => {
  const [progress, setProgress] = React.useState(30);
  return (
    <LoadingBarContext.Provider value={{ progress, setProgress }}>
      <LoadingBar
         color='#09b037'
        //color='#34eb67'
        // color='#f11946'
        height={2}
        waitingTime={500}
        loaderSpeed={300}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </LoadingBarContext.Provider>
  );
};

export default LoadingBarContext;
