import * as React from 'react';
import Card from '@mui/material/Card';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField, Typography } from '@mui/material';

export default function SettingsContent() {
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
        <Typography sx={{ ml: '16px' }}>Имя</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="firstName"
          label="Имя"
          type="firstName"
          id="firstName"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Фамилия</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Фамилия"
          type="lastName"
          id="lastName"
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={['DatePicker']}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mr: '16px',
          }}>
          <Typography sx={{ ml: '16px' }}>Дата рождения</Typography>
          <DatePicker label="Дата рождения" sx={{ width: '380px' }} />
        </DemoContainer>
      </LocalizationProvider>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Эл.почта</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="email"
          label="Эл.почта"
          type="email"
          id="email"
          autoComplete="email"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Телефон</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Телефон"
          type="phone"
          id="phone"
          autoComplete="phone"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ ml: '16px' }}>Регион</Typography>
        <TextField
          sx={{ width: '380px', mr: '16px' }}
          margin="normal"
          required
          fullWidth
          name="region"
          label="Регион"
          type="text"
          id="region"
          autoComplete="region"
        />
      </Box>
      <Box sx={{ textAlign: 'center', mt: '32px' }}>
        <Typography>Вы можете удалить свой профиль</Typography>
      </Box>
    </Card>
  );
}
