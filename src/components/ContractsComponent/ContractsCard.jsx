import * as React from 'react';
import cardIcon from '../../assets/cardIcon.svg';
import contractCard from '../../assets/mainPhoto.png';
import sportPhoto from '../../assets/sport.png';
import foodPhoto from '../../assets/food.png';
import { Box, Paper, Typography } from '@mui/material';
import ContractsCardMenu from './ContractsCardMenu';

export default function ContractsCard({ title, dateFrom, dateTo, ids, handleCompleteContract }) {
  const currentPhoto = Number(window.localStorage.getItem('currentPhoto'));

  const handlePhoto = () => {
    if (currentPhoto === 0) {
      return contractCard;
    } else if (currentPhoto === 1) {
      return sportPhoto;
    } else if (currentPhoto === 2) {
      return foodPhoto;
    }
  };
  console.log(currentPhoto);
  return (
    <Box sx={{ margin: '8px', position: 'relative' }}>
      <img width={286} height={180} src={handlePhoto()} alt="ContractCard" />

      <Box sx={{ positon: 'absolute', top: 0, right: 0, bottom: 0 }}>
        <ContractsCardMenu id={ids} handleCompleteContract={handleCompleteContract} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: '1',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '218px',
          height: '115px',
          margin: '34px auto',
        }}>
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            textAlign: 'center',
            // height: '100px',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={cardIcon} alt="cardIcon" />
            <Typography sx={{ fontSize: '12px', paddingLeft: '6px' }}>Целевой контракт</Typography>
          </Box>
          <Typography sx={{ fontSize: '16px', fontWeight: '700' }}>{title}</Typography>
          <Typography sx={{ fontSize: '10px', fontWeight: '700' }}>
            {dateFrom} - {dateTo}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
