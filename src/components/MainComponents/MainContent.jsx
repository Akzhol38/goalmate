import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import plus from '../../assets/plus.svg';

import mainPhoto from '../../assets/mainPhoto.png';
import sportPhoto from '../../assets/sport.png';
import foodPhoto from '../../assets/food.png';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import MainContentCard from './MainContentCard';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainContent({ firstname, lastname, userId, isFirst }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [joinOpen, setJoinOpen] = React.useState(false);
  const handleJoinOpen = () => setJoinOpen(true);
  const handleJoinClose = () => setJoinOpen(false);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [reward, setReward] = React.useState('');
  const [punishment, setPunishment] = React.useState('');
  const [friendName, setFriendName] = React.useState('');
  const [friendNumber, setFriendNumber] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');

  const [mainContracts, setMainContracts] = React.useState([]);

  React.useEffect(() => {
    fetchContracts();
  }, [userId]);

  const fetchContracts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:9088/api/v1/contracts/users/${userId}`);
      const sortedContracts = data.sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo));
      const latestContract = sortedContracts[0];
      setMainContracts(latestContract ? [latestContract] : []);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при получения контрактов');
    }
  };

  // React.useEffect(() => {
  //   axios
  //     .post(` http://localhost:9088/api/v1/contracts/${contractId}/join-contract?userId=${id}`)
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //       alert('Ошибка при получения подписчиков');
  //     });
  // }, []);
  const [joinContracts, setJoinContracts] = React.useState([]);
  const handleJoinOpens = async () => {
    // setJoinOpen(true);
    try {
      const id = window.localStorage.getItem('id');
      if (mainContracts.length > 0) {
        const contractId = mainContracts[0].id;
        const response = await axios.post(
          `http://localhost:9088/api/v1/contracts/${contractId}/join-contract?userId=${id}`,
        );
        setJoinContracts(response.data);
        console.log('Контракт Скопирован успешно');
        toast.success('Вы успешно присоединились к контракту');
        // Выполните необходимые действия при успешном выполнении запроса
      }
    } catch (error) {
      console.warn(error);
      alert('Ошибка при выполнении запроса');
      // Выполните необходимые действия при ошибке
    }
  };

  console.log(joinContracts);

  const photos = [mainPhoto, sportPhoto, foodPhoto];
  const [currentPhoto, setCurrentPhoto] = React.useState(0);

  const handlePhoto = (index) => {
    setCurrentPhoto(index);
    console.log(index);
    window.localStorage.setItem('currentPhoto', index);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const JoinStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 800,
    bgcolor: 'background.paper',
    maxHeight: '100%',
  };

  return (
    <Card sx={{ width: 551, height: 990, mt: isFirst ? 15 : 0, ml: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', pt: '24px', pl: '16px', pb: '16px' }}>
          <Stack direction="row" spacing={1}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
          </Stack>
          <Box sx={{ pl: '6px' }}>
            <Typography sx={{ fontWeight: 700 }}>
              {firstname} {lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Almaty, Kazakhstan
            </Typography>
          </Box>
        </Box>
        <Box>
          <MoreHorizIcon
            onClick={handleOpen}
            sx={{ cursor: 'pointer', pr: '16px', fontSize: '30px' }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem button divider>
                <ListItemText primary="Отменить подписку" />
              </ListItem>
              <ListItem onClick={handleClose} button>
                <ListItemText primary="Отмена" />
              </ListItem>
            </List>
          </Modal>

          <Modal
            open={joinOpen}
            onClose={handleJoinClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={JoinStyle}>
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
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Box>
      {/* <img src={mainPhoto} width="100%" height={658} /> */}
      <MainContentCard userId={userId} mainContracts={mainContracts} />
      <Box sx={{ display: 'flex', pl: '18px', pt: '19px', pb: '18px', pr: '18px' }}>
        <FavoriteBorderIcon sx={{ pr: '15px' }} />
        <ChatBubbleOutlineOutlinedIcon />
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img style={{ marginLeft: '280px' }} src={plus} alt="Plus" />
          <Typography onClick={handleJoinOpens} sx={{ fontWeight: '600', marginLeft: '10px' }}>
            Присоединиться
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pl: '16px' }}>
        <Typography sx={{ pb: '10px', fontWeight: 700 }}>146 отметок “Нравится”</Typography>
        <Typography sx={{ pb: '10px' }}>
          <span style={{ fontWeight: 700 }}>
            {firstname} {lastname}:
          </span>{' '}
          Моя новая цель на этот месяц 💫
        </Typography>
        <Typography sx={{ opacity: '0.5' }}>Посмотреть все комментарии (4)</Typography>
        <TextField
          sx={{ width: '500px', opacity: '0.5' }}
          label="Добавить коментарий..."
          variant="standard"
        />
      </Box>
    </Card>
  );
}
