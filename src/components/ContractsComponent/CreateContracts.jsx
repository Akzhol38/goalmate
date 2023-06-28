import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import create from '../../assets/create.svg';
import { Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import CreateContractsCard from './CreateContractsCard';
import Divider from '@mui/material/Divider';
import ContractsCard from './ContractsCard';

import mainPhoto from '../../assets/mainPhoto.png';
import sportPhoto from '../../assets/sport.png';
import foodPhoto from '../../assets/food.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  height: 800,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  maxHeight: '100%',
};

export default function CreateContracts() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [reward, setReward] = React.useState('');
  const [punishment, setPunishment] = React.useState('');
  const [friendName, setFriendName] = React.useState('');
  const [friendNumber, setFriendNumber] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');

  const photos = [mainPhoto, sportPhoto, foodPhoto];
  const [currentPhoto, setCurrentPhoto] = React.useState(0);

  const handlePhoto = (index) => {
    setCurrentPhoto(index);
    console.log(index);
    window.localStorage.setItem('currentPhoto', index);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          mt: '5px',
          ml: 55,
          backgroundColor: '#C3FF29',
          color: '#000',
          '&:hover': {
            backgroundColor: '#C3FF29',
          },
        }}
        onClick={handleOpen}>
        {<Avatar alt="Create" src={create} sx={{ pr: '10px', width: '20px', height: '20px' }} />}
        Создать
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{ p: '20px', fontSize: '24px' }}
              textAlign="center"
              id="modal-modal-title"
              variant="h6"
              component="h1">
              Создать Контракт
            </Typography>
            <Divider />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: '10px',
                  m: 4,
                  overflow: 'hidden',
                }}>
                <TextField
                  margin="normal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Ваша цель"
                  variant="outlined"
                />
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                  label="Что вы будете делать?"
                  variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    margin="normal"
                    type="date"
                    // label="dateFrom"
                    variant="outlined"
                    sx={{ width: '256px' }}
                  />
                  <TextField
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    margin="normal"
                    type="date"
                    // label="dateTo"
                    variant="outlined"
                    sx={{ width: '256px' }}
                  />
                </Box>
                <TextField
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  margin="normal"
                  label="Награда, если выполнить цель"
                  variant="outlined"
                />

                <TextField
                  value={punishment}
                  onChange={(e) => setPunishment(e.target.value)}
                  margin="normal"
                  label="Наказание, если не выполнить цель"
                  variant="outlined"
                />
                {/* <TextField
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  margin="normal"
                  label="Полное имя"
                  variant="outlined"
                /> */}
                <TextField
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  margin="normal"
                  label="Свидетель"
                  variant="outlined"
                />
                <TextField
                  value={friendNumber}
                  onChange={(e) => setFriendNumber(e.target.value)}
                  margin="normal"
                  label="Номер телефона"
                  variant="outlined"
                />
                <Box sx={{ display: 'flex' }}>
                  {photos.map((photo, index) => (
                    <img
                      key={photo}
                      onClick={() => handlePhoto(index)}
                      style={{
                        borderRadius: '5px',
                        margin: '20px',
                        cursor: 'pointer',
                        ':hover': { border: '3px solid #000' },
                      }}
                      width="200px"
                      height="90px"
                      src={photo}
                      alt="mainPhoto"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <CreateContractsCard
                title={title}
                description={description}
                dateFrom={dateFrom}
                dateTo={dateTo}
                reward={reward}
                punishment={punishment}
                friendName={friendName}
                friendNumber={friendNumber}
                setOpen={setOpen}
                currentPhoto={currentPhoto}
                setCurrentPhoto={setCurrentPhoto}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
