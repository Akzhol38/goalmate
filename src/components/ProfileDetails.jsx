import { Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import React from 'react';
import ProfileContractContent from './ContractsComponent/ProfileContractContent';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProfileDetails = () => {
  const storedFirstname = window.localStorage.getItem('firstname');
  const storedLastname = window.localStorage.getItem('lastname');

  const firstname = useSelector((state) => state.auth.data?.firstname) || storedFirstname;
  const lastname = useSelector((state) => state.auth.data?.lastname) || storedLastname;

  const [contracts, setContracts] = React.useState([]);
  const [followings, setFollowings] = React.useState([]);
  const id = window.localStorage.getItem('id');

  React.useEffect(() => {
    axios
      .get(`http://localhost:9088/api/v1/contracts/users/${id}`)
      .then((res) => {
        setContracts(res.data);
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
    <div>
      <Card
        sx={{
          width: 551,
          height: 320,
          mt: 15,
          ml: 5,
          pt: '24px',
          pl: '16px',
          backgroundImage: 'linear-gradient(to bottom, #D0D0D0, #D0D0D0 50%, transparent 50%)',
        }}>
        <Box
          sx={{
            pt: 8,
            pl: 1,
          }}>
          <Stack direction="row" spacing={1}>
            <Avatar
              sx={{ width: '148px', height: '148px' }}
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
          </Stack>
          <Box sx={{ pl: '6px', pt: '10px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '24px' }}>
              {firstname} {lastname}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: '16px', pr: '20px', pl: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontSize={19} fontWeight={700}>
              {followings.length}
            </Typography>
            <Typography sx={{ pl: 1 }}>Подписчики</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: '12px' }}>
            <Typography fontSize={19} fontWeight={700}>
              {contracts.length}
            </Typography>
            <Typography sx={{ pl: 1 }}>Контракты</Typography>
          </Box>
        </Box>
      </Card>
      <ProfileContractContent />
    </div>
  );
};

export default ProfileDetails;
