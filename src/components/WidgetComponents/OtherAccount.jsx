import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import FollowingAccount from './FollowingAccount';
import axios from 'axios';
export default function OtherAccount() {
  const [users, setUsers] = React.useState([]);
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
  return (
    <Card sx={{ width: 450, height: 'auto', mt: 15, ml: 5, pb: 2 }}>
      <Box sx={{ display: 'flex', mb: '24px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: '6px',
          }}>
          <Typography sx={{ fontWeight: 700, pt: '24px', pl: '16px' }}>
            Добавить в свою ленту
          </Typography>
          {/* <Typography
            sx={{ pt: '24px', pl: 18, textTransform: 'underline' }}
            color="text.secondary">
            Все
          </Typography> */}
        </Box>
      </Box>
      {users.map((user) => (
        <FollowingAccount key={user.id} username={user.username} id={user.id} />
      ))}
    </Card>
  );
}
