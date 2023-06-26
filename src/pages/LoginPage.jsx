import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { Link, Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      window.localStorage.setItem('username', values.username);
      window.localStorage.setItem('firstname', data.payload.firstname);
      window.localStorage.setItem('lastname', data.payload.lastname);
      window.localStorage.setItem('id', data.payload.id);
    }
  };

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography
        sx={{
          textAlign: 'center',
          color: '#C3FF29',
          fontSize: '48px',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: '900',
          marginTop: '50px',
        }}>
        GoalMate
      </Typography>

      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '500px',
          backgroundColor: '#fff',
        }}>
        <Typography
          sx={{
            fontSize: '32px',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '600',
          }}>
          Войти
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register('username', { required: 'Укажите Логин' })}
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
            sx={{
              mt: 2,
            }}
          />
          <TextField
            margin="normal"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите почту' })}
            fullWidth
            id="email"
            label="Эл.почта"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль' })}
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Box textAlign="center">
            <Button
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: '100%', // Изменили ширину кнопки на 100% для адаптивности
                height: '40px',
                backgroundColor: '#C3FF29',
                color: '#000',
              }}>
              Войти
            </Button>

            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '600',
                mt: 1,
              }}>
              <Link underline="none" color="inherit" to="/register">
                Не зарегистрированы в GoalMate? Зарегистрироваться
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
