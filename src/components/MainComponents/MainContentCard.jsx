import * as React from 'react';
import cardIcon from '../../assets/cardIcon.svg';
import submitContract from '../../assets/submitContract.svg';
import contractCard from '../../assets/mainPhoto.png';
import sportPhoto from '../../assets/sport.png';
import foodPhoto from '../../assets/food.png';
import Divider from '@mui/material/Divider';
import done from '../../assets/done.png';

import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import axios from 'axios';
export default function MainContentCard({ mainContracts }) {
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
            height: '610px',
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '32px', pb: '10px' }}>
            <img width="30px" height="30px" src={cardIcon} alt="cardIcon" />
            <Typography
              sx={{
                fontSize: '24px',
                paddingLeft: '6px',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '400',
              }}>
              Целевой контракт
            </Typography>
          </Box>

          {mainContracts.map((item, index) => (
            <div key={item}>
              <Typography
                sx={{
                  fontSize: '28px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '700',
                }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '28px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '700',
                  mb: 2,
                }}>
                {item.description}
              </Typography>
              <Typography
                sx={{
                  fontSize: '20px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '700',
                  mb: '28px',
                }}>
                {item.dateFrom && item.dateTo
                  ? `${new Date(item.dateFrom).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })} - ${new Date(item.dateTo).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}`
                  : ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  mb: '24px',
                  ml: '32px',
                  textAlign: 'start',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '400',
                }}>
                Награда: {item.reward}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  mb: '48px',
                  ml: '32px',
                  textAlign: 'start',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '400',
                }}>
                Наказание:{item.punishment}
              </Typography>
              <Box
                sx={{
                  height: '220px',
                  backgroundColor: '#F4F4F4',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    textAlign: 'start',
                    pl: '32px',
                    pt: '24px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '400',
                  }}>
                  Я обязуюсь придерживаться цели и условий, изложенными выше с{' '}
                  <span style={{ fontWeight: 700 }}>
                    {item.dateFrom
                      ? `${new Date(item.dateFrom).toLocaleString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })} `
                      : ''}
                  </span>
                  <br /> по{' '}
                  <span style={{ fontWeight: 700, fontFamily: '"Montserrat", sans-serif' }}>
                    {item.dateTo
                      ? ` ${new Date(item.dateTo).toLocaleString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}`
                      : ''}
                  </span>
                </Typography>
                {/* <TextField
                sx={{ width: '408px' }}
                id="standard-basic"
                label="Ваше полное имя"
                variant="standard"
              /> */}
                <Typography
                  sx={{
                    fontFamily: '"Dancing Script", cursive',
                    fontSize: '22px',
                    textAlign: 'start',
                    fontWeight: 700,
                    pl: '32px',
                    pt: '5px',
                  }}>
                  {'Askar Aidosuly'}
                </Typography>
                <Divider sx={{ ml: '32px', mr: '32px' }} />
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    textAlign: 'start',
                    pl: '32px',
                    pt: '8px',
                    fontFamily: '"Montserrat", sans-serif',
                  }}>
                  Свидетель: {item.friendName} ({item.friendNumber})
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: '32px', pt: '14px' }}>
                  <img src={done} alt="Done" />
                  <Typography sx={{ ml: '10px', fontFamily: '"Montserrat", sans-serif' }}>
                    Подписано{' '}
                    {item.dateFrom
                      ? `${new Date(item.dateFrom).toLocaleString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })} `
                      : ''}
                  </Typography>
                </Box>
              </Box>
            </div>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}
