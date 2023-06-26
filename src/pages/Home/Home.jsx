import React from 'react';
import './Home.scss';
import axios from 'axios';
import Category from '../../components/Category';
import Header from '../../components/Header';
import MainContent from '../../components/MainComponents/MainContent';
import OtherAccount from '../../components/WidgetComponents/OtherAccount';
import Widget from '../../components/WidgetComponents/Widget';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
const Home = () => {
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const idUser = window.localStorage.getItem('id');

  React.useEffect(() => {
    axios
      .get(`http://localhost:9088/api/v1/${idUser}/followings`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получения подписчиков');
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Container maxWidth="xl">
        <div className="app__inner">
          <div>
            <Widget />
            <Category currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
          </div>
          <div>
            {users.length > 0 ? (
              users.map((user, index) => (
                <MainContent
                  key={user.id}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  userId={user.id}
                  isFirst={index === 0}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    mt: 30,
                    ml: 5,
                    fontSize: '35px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '700',
                  }}
                  variant="h5"
                  align="center"
                  color="black">
                  Добро пожаловать в GoalMate!
                </Typography>
                <Typography>
                  Здесь будут показываться цели людей на которых вы подпишитесь
                </Typography>
              </div>
            )}
          </div>
          <div>
            <OtherAccount />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
