import * as React from 'react';
import Card from '@mui/material/Card';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SettingsOptionsSec() {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [passwordChanged, setPasswordChanged] = React.useState(false);
  const userId = window.localStorage.getItem('id');

  const handleChangePassword = () => {
    const data = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };
    console.log(oldPassword);
    console.log(newPassword);
    axios
      .post(`http://localhost:9088/api/v1/users/change-password?userId=${userId}`, data)
      .then((response) => {
        toast.success('Пароль успешно изменен!');
        setPasswordChanged(true);
        console.log('Успешно');
      })
      .catch((error) => {
        // Обработка ошибки при изменении пароля
        toast.error('Ошибка при изменении пароля:', error);
      });
  };

  return (
    <Card
      sx={{
        width: 551,
        height: 553,
        mt: 15,
        ml: 5,
        display: 'flex',
        flexDirection: 'column',
      }}>
      {/* {passwordChanged && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Пароль успешно изменен!</Alert>
        </Stack>
      )} */}
      <ToastContainer />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Старый пароль</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="OldPassword"
          label="Старый пароль"
          type="password"
          id="OldPassword"
          autoComplete="password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Новый пароль</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="Новый пароль"
          type="password"
          id="newPassword"
          autoComplete="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>
          Подтвердите
          <br /> новый пароль
        </Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="ConNewPass"
          label="Подтвердите новый пароль"
          type="password"
          id="ConNewPass"
          autoComplete="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </Box> */}
      <Box sx={{ textAlign: 'center', mt: '20px' }}>
        <Button variant="contained" sx={{ width: '200px' }} onClick={handleChangePassword}>
          Сменить пароль
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: '32px' }}>
        <Typography>Вы можете удалить свой профиль</Typography>
      </Box>
    </Card>
  );
}
