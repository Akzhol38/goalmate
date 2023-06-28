import * as React from 'react';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { selectIsAuth } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

export default function Header() {
  const storedUsername = window.localStorage.getItem('username');
  const username = useSelector((state) => state.auth.data?.username) || storedUsername;

  // const isAuth = useSelector(selectIsAuth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: 'white', height: '80px', paddingTop: '10px' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ ml: 10, mr: 10 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={'black'}
              sx={{
                fontSize: '32px',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '900',
              }}>
              GoalMate
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Link to="/profile">
              <Box>
                <IconButton size="large" edge="end" color="black">
                  <Stack direction="row" spacing={1}>
                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                  </Stack>
                  {/* <AccountCircle /> */}
                  <Typography
                    sx={{
                      ml: '10px',
                      color: '#000',
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: '700',
                    }}>
                    {username}
                  </Typography>
                </IconButton>
              </Box>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
