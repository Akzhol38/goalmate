import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import plus from '../../assets/plus.svg';

import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import MainContentCard from './MainContentCard';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainContent({ firstname, lastname, userId, isFirst }) {
  const [mainContracts, setMainContracts] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

  const [joinContracts, setJoinContracts] = React.useState([]);

  const handleJoinOpens = async () => {
    try {
      const id = window.localStorage.getItem('id');
      if (mainContracts.length > 0) {
        const contractId = mainContracts[0].id;

        const JoinResponse = await axios.post(
          `http://localhost:9088/api/v1/contracts/${contractId}/join-contract?userId=${id}`,
        );
        setJoinContracts(JoinResponse.data);
        console.log('Контракт Скопирован успешно');
        toast.success('Вы успешно присоединились к контракту');
      }
    } catch (error) {
      console.warn(error);
      alert('Ошибка при присоеденение контракта');
    }
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

  return (
    <Card sx={{ width: 551, height: 990, mt: isFirst ? 15 : 0, ml: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', pt: '24px', pl: '16px', pb: '16px' }}>
          <Stack direction="row" spacing={1}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
          </Stack>
          <Box sx={{ pl: '6px' }}>
            <Typography
              sx={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: '700' }}>
              {firstname} {lastname}
            </Typography>
            <Typography
              sx={{ fontSize: '13px', fontFamily: '"Montserrat", sans-serif', fontWeight: '500' }}
              variant="body2"
              color="text.secondary">
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
        </Box>
      </Box>

      <MainContentCard userId={userId} mainContracts={mainContracts} />
      <Box sx={{ display: 'flex', pl: '18px', pt: '19px', pb: '18px', pr: '18px' }}>
        <FavoriteBorderIcon sx={{ pr: '15px' }} />
        <ChatBubbleOutlineOutlinedIcon />
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img style={{ marginLeft: '280px' }} src={plus} alt="Plus" />
          <Typography
            onClick={handleJoinOpens}
            sx={{ fontWeight: '700', marginLeft: '10px', fontFamily: '"Montserrat", sans-serif' }}>
            Присоединиться
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pl: '16px' }}>
        <Typography sx={{ pb: '10px', fontWeight: 700, fontFamily: '"Montserrat", sans-serif' }}>
          146 отметок “Нравится”
        </Typography>
        <Typography sx={{ pb: '10px' }}>
          <span
            style={{ fontSize: '16px', fontFamily: '"Montserrat", sans-serif', fontWeight: '700' }}>
            {firstname} {lastname}:
          </span>{' '}
          Моя новая цель на этот месяц 💫
        </Typography>
        <Typography sx={{ opacity: '0.8', fontFamily: '"Montserrat", sans-serif' }}>
          Посмотреть все комментарии (4)
        </Typography>
        <TextField
          sx={{ width: '500px', opacity: '0.5' }}
          label="Добавить коментарий..."
          variant="standard"
        />
      </Box>
    </Card>
  );
}
