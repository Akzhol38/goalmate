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
import mainPhoto from '../../assets/mainPhoto.png';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { useSelector } from 'react-redux';
import MainContentCard from './MainContentCard';

export default function MainContent({ firstname, lastname, userId, isFirst }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        </Box>
      </Box>
      {/* <img src={mainPhoto} width="100%" height={658} /> */}
      <MainContentCard userId={userId} />
      <Box sx={{ display: 'flex', pl: '18px', pt: '19px', pb: '18px', pr: '18px' }}>
        <FavoriteBorderIcon sx={{ pr: '15px' }} />
        <ChatBubbleOutlineOutlinedIcon />
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
