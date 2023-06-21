import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
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
    defaultValues: {
      username: 'ДжонниДэн',
      email: 'Jonhdan@gmail.com',
      password: 'Jonh12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      // <Stack sx={{ width: '100%' }} spacing={2}>
      //   <Alert severity="error">Не удалось авторизоваться</Alert>
      // </Stack>;
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
          fontSize: '38px',
          fontWeight: '700',
          marginTop: '50px',
        }}>
        Goalmate
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
          height: '496px',
        }}>
        <Typography fontSize={32} fontWeight={600}>
          Войти
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register('username', { required: 'Укажите UserName' })}
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
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
            autoFocus
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

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '24px',
            }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомнить меня"
            />
            <Link href="#" variant="body2">
              Забыли пароль ?
            </Link>
          </Box>
          <Box textAlign="center">
            <Button
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: '360px',
                height: '40px',
                backgroundColor: '#C3FF29',
                color: '#000',
              }}>
              Войти
            </Button>

            <Box>
              <Link to="/register">{'Не зарегистрированы в GoalMate? Зарегистрироваться'}</Link>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
