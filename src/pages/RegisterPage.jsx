import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../redux/slices/authSlice';

export default function RegisterPage() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstname: 'Джон',
      lastname: 'Дэн',
      username: 'ДжонниДэн',
      email: 'Jonhdan@gmail.com',
      password: 'Jonh12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if (!data.payload) {
      alert('Не удалось зарегистроваться');
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
          height: '596px',
        }}>
        <Typography fontSize={32} fontWeight={600}>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            error={Boolean(errors.firstname?.message)}
            helperText={errors.firstname?.message}
            {...register('firstname', { required: 'Укажите Имя' })}
            fullWidth
            id="firstname"
            label="Имя"
            name="firstname"
            autoComplete="firstname"
            autoFocus
          />
          <TextField
            margin="normal"
            error={Boolean(errors.lastname?.message)}
            helperText={errors.lastname?.message}
            {...register('lastname', { required: 'Укажите Фамилию' })}
            fullWidth
            id="lastname"
            label="Фамилия"
            name="lastname"
            autoComplete="lastname"
            autoFocus
          />
          <TextField
            margin="normal"
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register('username', { required: 'Укажите Username' })}
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
            name="email"
            label="Эл.почта"
            type="email"
            id="email"
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
                width: '360px',
                height: '40px',
                backgroundColor: '#C3FF29',
                color: '#000',
              }}>
              зарегистрироваться
            </Button>
            <Box>
              <Link to="/">{'Не зарегистрированы в GoalMate? Зарегистрироваться'}</Link>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
