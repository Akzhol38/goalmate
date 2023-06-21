import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Settings from './pages/Settings';
import SettingsOpSec from './pages/SettingsOpSec';
import Contracts from './pages/Contracts';
import ContractContent from './components/ContractsComponent/ContractContent';
import UserProfile from './pages/UserProfile';

// function PrivateRoute({ path, element }) {
//   const token = localStorage.getItem('token');

//   return token ? <Route path={path} element={element} /> : <Navigate to="/" replace={true} />;
// }

function App() {
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // Проверяем токен на валидность или делаем другую логику проверки авторизации
  //     // Если токен валиден или пользователь авторизован, устанавливаем isAuthenticated в true
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/contracts/:id" element={<ContractContent />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/changePassword" element={<SettingsOpSec />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
