import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Widget() {
  const storedUsername = window.localStorage.getItem('username');
  const storedFirstname = window.localStorage.getItem('firstname');
  const storedLastname = window.localStorage.getItem('lastname');

  const firstname = useSelector((state) => state.auth.data?.firstname) || storedFirstname;
  const lastname = useSelector((state) => state.auth.data?.lastname) || storedLastname;
  const username = useSelector((state) => state.auth.data?.username) || storedUsername;

  const [data, setData] = React.useState([]);
  const [followings, setFollowings] = React.useState([]);
  const id = window.localStorage.getItem('id');

  React.useEffect(() => {
    axios
      .get(`http://localhost:9088/api/v1/contracts/users/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получения количество контрактов');
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`http://localhost:9088/api/v1/${id}/followed`)
      .then((res) => {
        setFollowings(res.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получения количество подписчиков');
      });
  }, []);

  return (
    <Card
      sx={{
        width: 194,
        height: 136,
        mt: 15,
        ml: 5,
        pt: '24px',
        pl: '16px',
        '@media (max-width: 600px)': {
          display: 'none',
        },
      }}>
      <Box sx={{ display: 'flex' }}>
        <Stack direction="row" spacing={1}>
          <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
        </Stack>
        <Box sx={{ pl: '6px' }}>
          <Typography
            sx={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: '700' }}>
            {firstname} {lastname}
          </Typography>
          <Typography
            sx={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: '500' }}
            variant="body2"
            color="text.secondary">
            {username}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', pt: '16px', pr: '20px' }}>
        <Box textAlign="center">
          <Typography
            sx={{ fontSize: '19px', fontFamily: '"Montserrat", sans-serif', fontWeight: '700' }}>
            {followings.length}
          </Typography>
          <Typography
            sx={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: '500' }}>
            Подписчики
          </Typography>
        </Box>
        <Box textAlign="center" sx={{ pl: '12px' }}>
          <Typography
            sx={{ fontSize: '19px', fontFamily: '"Montserrat", sans-serif', fontWeight: '700' }}>
            {data.length}
          </Typography>
          <Typography
            sx={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: '500' }}>
            Контракты
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
