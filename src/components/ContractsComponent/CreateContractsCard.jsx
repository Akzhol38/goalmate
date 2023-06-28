import * as React from 'react';
import cardIcon from '../../assets/cardIcon.svg';
import submitContract from '../../assets/submitContract.svg';
import contractCard from '../../assets/mainPhoto.png';
import sportPhoto from '../../assets/sport.png';
import foodPhoto from '../../assets/food.png';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setContractData } from '../../redux/slices/contractSlice';

export default function CreateContractsCard({
  title,
  description,
  dateFrom,
  dateTo,
  reward,
  punishment,
  friendName,
  friendNumber,
  setOpen,
  currentPhoto,
  setCurrentPhoto,
}) {
  const token = window.localStorage.getItem('token');
  const id = window.localStorage.getItem('id');
  const dispatch = useDispatch();

  const [fullName, setFullName] = React.useState('');

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        description,
        dateFrom,
        dateTo,
        reward,
        punishment,
        friendName,
        friendNumber,
        fullName,
      };
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:9088/api/v1/contracts/create?userId=${id}`,
        fields,
        config,
      );
      dispatch(setContractData(data));
      setOpen(false);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи');
    }
  };

  const hanldePhoto = () => {
    if (currentPhoto === 0) {
      return contractCard;
    } else if (currentPhoto === 1) {
      return sportPhoto;
    } else if (currentPhoto === 2) {
      return foodPhoto;
    }
  };

  return (
    <Box sx={{ margin: '8px', position: 'relative' }}>
      <img
        style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '660px' }}
        src={hanldePhoto()}
        alt={currentPhoto}
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
            // paddingTop: '10px',
            textAlign: 'center',
            height: '600px',
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '32px' }}>
            <img width="30px" height="30px" src={cardIcon} alt="cardIcon" />
            <Typography sx={{ fontSize: '24px', paddingLeft: '6px' }}>Целевой контракт</Typography>
          </Box>
          <Typography sx={{ fontSize: '32px', fontWeight: '700', mb: '8px' }}>{title}</Typography>
          <Typography sx={{ fontSize: '25px', fontWeight: '700' }}>{description}</Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: '700', mb: '28px' }}>
            {/* {dateFrom}-{dateTo} */}
            {dateFrom && dateTo
              ? `${new Date(dateFrom).toLocaleString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })} - ${new Date(dateTo).toLocaleString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}`
              : ''}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              mb: '24px',
              ml: '32px',
              textAlign: 'start',
            }}>
            Награда: {reward}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              mb: '48px',
              ml: '32px',
              textAlign: 'start',
            }}>
            Наказание:{punishment}
          </Typography>
          <Box sx={{ backgroundColor: '#F5F5F5', height: '260px', width: '470px' }}>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                textAlign: 'start',
                pl: '32px',
                pt: '24px',
              }}>
              Я обязуюсь придерживаться цели и условий, изложенными выше с{' '}
              <span style={{ fontWeight: 700 }}>
                {dateFrom
                  ? `${new Date(dateFrom).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })} `
                  : ''}
              </span>
              <br /> по{' '}
              <span style={{ fontWeight: 700 }}>
                {dateTo
                  ? ` ${new Date(dateTo).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}`
                  : ''}
              </span>
              .
            </Typography>
            <TextField
              sx={{ width: '408px' }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              Свидетель: {friendName} ({friendNumber})
            </Typography>
            <Button
              onClick={onSubmit}
              sx={{
                width: '408px',
                color: '#000',
                backgroundColor: '#B9ED39',
                mt: 50,
                '&:hover': {
                  backgroundColor: '#B9ED39',
                },
                position: 'absolute',
                bottom: '25px',
                left: '33px',
              }}
              variant="contained">
              <img
                style={{ width: '20px', height: '20px', paddingRight: '10px' }}
                src={submitContract}
                alt="Подписать Контракт"
              />
              Подписать контракт
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
