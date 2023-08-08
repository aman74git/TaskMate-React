import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layouts/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TaskPage from './pages/TaskPage';
import LoggedInRoutes from './layouts/LoggedInRoutes';
import LoggedOutRoutes from './layouts/LoggedOutRoutes';
import PersistanceLogin from './layouts/PersistanceLogin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route element={<PersistanceLogin />}>
        <Route element={<Layout isLoggedIn={true} />}>
          <Route element={<LoggedInRoutes />}>
            <Route path='/home' element={<TaskPage />} />
          </Route>
        </Route>
        <Route element={<Layout isLoggedIn={false} />}>
          <Route element={<LoggedOutRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
