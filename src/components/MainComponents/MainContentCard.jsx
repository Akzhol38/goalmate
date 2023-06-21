import * as React from 'react';
import cardIcon from '../../assets/cardIcon.svg';
import submitContract from '../../assets/submitContract.svg';
import contractCard from '../../assets/mainPhoto.png';
import sportPhoto from '../../assets/sport.png';
import foodPhoto from '../../assets/food.png';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import axios from 'axios';
export default function MainContentCard({ userId }) {
  const [mainContracts, setMainContracts] = React.useState([]);
  // const [loading, setLoading] = React.userState(false);
  const id = window.localStorage.getItem('id');
  const fetchContracts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:9088/api/v1/main?userId=${id}`);

      setMainContracts(data);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при получения контрактов');
    }
  };

  React.useEffect(() => {
    fetchContracts();
  }, []);
  console.log(mainContracts.title);
  return (
    <Box sx={{ margin: '8px', position: 'relative' }}>
      <img
        style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '660px' }}
        src={contractCard}
        alt="contractCard"
      />
      <Box
        sx={{
          position: 'absolute',
          zIndex: '1',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '472px',
          margin: '25px auto',
        }}>
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            height: '600px',
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '32px' }}>
            <img width="30px" height="30px" src={cardIcon} alt="cardIcon" />
            <Typography sx={{ fontSize: '24px', paddingLeft: '6px' }}>Целевой контракт</Typography>
          </Box>

          {mainContracts.map((item, index) => (
            <>
              <Typography sx={{ fontSize: '32px', fontWeight: '700', mb: '8px' }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '25px', fontWeight: '700' }}>
                {item.description}
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: '700', mb: '28px' }}>
                {item.dateFrom}-{item.dateTo}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  mb: '24px',
                  ml: '32px',
                  textAlign: 'start',
                }}>
                Награда: {item.reward}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  mb: '48px',
                  ml: '32px',
                  textAlign: 'start',
                }}>
                Наказание:{item.punishment}
              </Typography>
              {/* <Box sx={{ backgroundColor: '#F5F5F5', height: '260px', width: '470px' }}> */}
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'start',
                  pl: '32px',
                  pt: '24px',
                }}>
                Я обязуюсь придерживаться цели и условий, изложенными выше с{' '}
                <span style={{ fontWeight: 700 }}>{item.dateFrom}</span>
                <br /> по <span style={{ fontWeight: 700 }}>{item.dateTo}</span>
              </Typography>
              <TextField
                sx={{ width: '408px' }}
                id="standard-basic"
                label="Ваше полное имя"
                variant="standard"
              />
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'start',
                  pl: '32px',
                  pt: '14px',
                }}>
                Свидетель: {item.friendName} ({item.friendNumber})
              </Typography>
            </>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}
