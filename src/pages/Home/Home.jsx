import React from 'react';
import './Home.scss';
import axios from 'axios';
import Category from '../../components/Category';
import Header from '../../components/Header';
import MainContent from '../../components/MainComponents/MainContent';
import OtherAccount from '../../components/WidgetComponents/OtherAccount';
import Widget from '../../components/WidgetComponents/Widget';
import { Container } from '@mui/material';
const Home = () => {
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const idUser = window.localStorage.getItem('id');
  React.useEffect(() => {
    axios
      .get(`http://localhost:9088/api/v1/random-users?userId=${idUser}`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получения статьи');
      });
  }, []);
  console.log(users);
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
            {users.map((user, index) => (
              <MainContent
                firstname={user.firstname}
                lastname={user.lastname}
                userId={user.id}
                isFirst={index === 0}
              />
            ))}
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
