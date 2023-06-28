import React from 'react';
import './Category.scss';

import Stack from '@mui/material/Stack';
import MainIcon from '../../src/assets/main.svg';
import ContractsIcon from '../../src/assets/contracts.svg';
import SettingsIcon from '../../src/assets/settings.svg';
import LogOutIcon from '../../src/assets/logOut.svg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { logout, selectIsAuth } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Category = () => {
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const categories = ['Главная', 'Контракты', 'Настройки', 'Выйти'];
  const categoryIcons = [MainIcon, ContractsIcon, SettingsIcon, LogOutIcon];
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти ?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('firstname');
      window.localStorage.removeItem('lastname');
      window.localStorage.removeItem('completedContracts');
      window.localStorage.removeItem('followings');
      window.localStorage.removeItem('id');
    }
  };

  React.useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/home':
        setCurrentCategory(0);
        break;
      case '/contracts':
        setCurrentCategory(1);
        break;
      case '/settings':
      case '/settings/changePassword':
      case '/settings/notifications':
        setCurrentCategory(2);
        break;
      default:
        setCurrentCategory(0);
    }
  }, [location]);

  const handleClick = (index) => {
    setCurrentCategory(index);
    switch (index) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/contracts');
        break;
      case 2:
        navigate('/settings');
        break;
      case 3:
        onClickLogout();
        navigate('/');
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {categories.map((categories, index) => (
        <div key={categories} className="stack">
          <Stack>
            <div onClick={() => handleClick(index)}>
              <Button
                className="category-btn"
                sx={{
                  backgroundColor: currentCategory === index ? '#C3FF29' : '',
                  color: 'black',
                  paddingLeft: 5,
                  paddingRight: 5,
                  '&:hover': {
                    backgroundColor: '#C3FF29',
                  },
                  fontSize: '16px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '600',
                }}>
                {<img className="icon" src={categoryIcons[index]} alt="Icon" />}
                {categories}
              </Button>
            </div>
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default Category;
