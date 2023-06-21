import * as React from 'react';
import Card from '@mui/material/Card';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function SettingsOptionsSec() {
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Старый пароль</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="OldPassword"
          label="Старый пароль"
          type="OldPassword"
          id="OldPassword"
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
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        />
      </Box>
      <Box sx={{ textAlign: 'center', mt: '20px' }}>
        <Button variant="contained" sx={{ width: '200px' }}>
          Сменить пароль
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: '32px' }}>
        <Typography>Вы можете удалить свой профиль</Typography>
      </Box>
    </Card>
  );
}
