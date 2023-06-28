import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContract,
  setContractArchived,
  setContractData,
  setContractDone,
} from '../../redux/slices/contractSlice';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Box, TextField, Paper } from '@mui/material';
import cardIcon from '../../assets/cardIcon.svg';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contractCard from '../../assets/mainPhoto.png';
import close from '../../assets/close.svg';
import done from '../../assets/done.png';

export default function ContractsCardMenu({
  id,
  handleCompleteContract,
  handleArchiveContract,
  tabValue,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const items = useSelector((state) => state.contracts.items);
  // console.log(items);
  const [selectedContract, setSelectedContract] = React.useState(null);
  const [joinOpen, setJoinOpen] = React.useState(false);
  const handleJoinOpen = () => {
    setJoinOpen(true);
    const selected = items.find((contract) => contract.id === id);
    setSelectedContract(selected);
  };
  const handleJoinClose = () => setJoinOpen(false);

  const JoinStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 730,
    bgcolor: 'background.paper',
    maxHeight: '100%',
  };

  const ShowStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 720,
    bgcolor: 'background.paper',
    maxHeight: '100%',
  };

  const [showOpen, setShowOpen] = React.useState(false);
  const handleShowOpen = () => {
    setShowOpen(true);
    const selected = items.find((contract) => contract.id === id);
    setSelectedContract(selected);
  };
  const handleShowClose = () => setShowOpen(false);

  const [titleText, setTitleText] = React.useState('');
  const [descriptionText, setDescriptionText] = React.useState('');
  const [rewardText, setRewardText] = React.useState('');
  const [punishmentText, setPunishmentText] = React.useState('');
  const [friendNameText, setFriendNameText] = React.useState('');
  const [friendNumberText, setFriendNumberText] = React.useState('');
  const [dateFromText, setDateFromText] = React.useState('');
  const [dateToText, setDateToText] = React.useState('');

  React.useEffect(() => {
    // if (items.length > 0) {
    //   setTitleText(items[0].title);
    //   setDescriptionText(items[0].description);
    //   setRewardText(items[0].reward);
    //   setPunishmentText(items[0].punishment);
    //   setFriendNameText(items[0].friendName);
    //   setFriendNumberText(items[0].friendNumber);
    //   setDateFromText(items[0].dateFrom);
    //   setDateToText(items[0].dateTo);
    // }

    if (selectedContract) {
      setTitleText(selectedContract.title);
      setDescriptionText(selectedContract.description);
      setRewardText(selectedContract.reward);
      setPunishmentText(selectedContract.punishment);
      setFriendNameText(selectedContract.friendName);
      setFriendNumberText(selectedContract.friendNumber);
      setDateFromText(selectedContract.dateFrom);
      setDateToText(selectedContract.dateTo);
    }
  }, [selectedContract]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const onData = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:9088/api/v1/contracts/${id}/change-status?status=ONGOING`,
      );
      dispatch(setContractData([data]));
    } catch (error) {
      console.warn(error);
      alert('Ошибка при изменение статусе(Выполнено)');
    }
  };

  const onSubmit = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:9088/api/v1/contracts/${id}/change-status?status=DONE`,
      );
      dispatch(setContractDone(data));
    } catch (error) {
      console.warn(error);
      alert('Ошибка при изменение статусе(Выполнено)');
    }
  };

  const onArchived = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:9088/api/v1/contracts/${id}/change-status?status=ARCHIVED`,
      );
      dispatch(setContractArchived(data));
    } catch (error) {
      console.warn(error);
      alert('Ошибка при изменение статусе(Архив)');
    }
  };

  const onDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:9088/api/v1/contracts/${id}`);
      dispatch(deleteContract(data));
    } catch (error) {
      console.warn(error);
      alert('Ошибка при удаления контракта');
    }
  };

  const handleUpdateContract = async () => {
    try {
      if (selectedContract) {
        await axios.put(`http://localhost:9088/api/v1/contracts/${id}`, {
          title: titleText,
          description: descriptionText,
          reward: rewardText,
          punishment: punishmentText,
          friendName: friendNameText,
          friendNumber: friendNumberText,
          dateFrom: dateFromText,
          dateTo: dateToText,
        });

        const updatedContract = {
          ...selectedContract,
          title: titleText,
          description: descriptionText,
          reward: rewardText,
          punishment: punishmentText,
          friendName: friendNameText,
          friendNumber: friendNumberText,
          dateFrom: dateFromText,
          dateTo: dateToText,
        };

        dispatch(setContractData([updatedContract]));
        console.log('Контракт успешно изменен');
        toast.success('Контракт успешно изменен');
      }
    } catch (error) {
      console.warn(error);
      toast.error('Ошибка при изменении контракта');
    }
  };

  const handleOnGoing = () => {
    setAnchorEl(null);
    onData();
  };

  const handleComplete = () => {
    setAnchorEl(null);
    onSubmit();
    handleCompleteContract(id);
  };

  const handleArchived = () => {
    setAnchorEl(null);
    onArchived();
    handleArchiveContract(id);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    onDelete();
  };

  console.log(titleText);

  return (
    <div>
      <Modal
        open={joinOpen}
        onClose={handleJoinClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={JoinStyle}>
          <Grid spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: '10px',
                  m: 4,
                  overflow: 'hidden',
                }}>
                <Typography sx={{ fontSize: '32px', textAlign: 'center', mb: 1 }}>
                  Изменение контракт
                </Typography>
                <Divider />
                <TextField
                  value={titleText}
                  // value={selectedContract ? selectedContract.title : ''}
                  onChange={(e) => setTitleText(e.target.value)}
                  label="Ваша цель"
                  margin="normal"
                  type="text"
                  variant="outlined"
                />
                <TextField
                  value={descriptionText}
                  // value={selectedContract ? selectedContract.description : ''}
                  onChange={(e) => setDescriptionText(e.target.value)}
                  margin="normal"
                  label="Что вы будете делать?"
                  type="text"
                  variant="outlined"
                />
                <Box sx={{ display: 'flex' }}>
                  <TextField
                    value={dateFromText}
                    // value={selectedContract ? selectedContract.dateFrom : ''}
                    onChange={(e) => setDateFromText(e.target.value)}
                    margin="normal"
                    type="date"
                    variant="outlined"
                    sx={{ width: '370px' }}
                  />
                  <TextField
                    value={dateToText}
                    // value={selectedContract ? selectedContract.dateTo : ''}
                    onChange={(e) => setDateToText(e.target.value)}
                    margin="normal"
                    type="date"
                    variant="outlined"
                    sx={{ width: '370px' }}
                  />
                </Box>
                <TextField
                  value={rewardText}
                  // value={selectedContract ? selectedContract.reward : ''}
                  onChange={(e) => setRewardText(e.target.value)}
                  margin="normal"
                  label="Награда, если выполнить цель"
                  variant="outlined"
                />

                <TextField
                  value={punishmentText}
                  // value={selectedContract ? selectedContract.punishment : ''}
                  onChange={(e) => setPunishmentText(e.target.value)}
                  margin="normal"
                  label="Наказание, если не выполнить цель"
                  variant="outlined"
                />
                <TextField
                  value={friendNameText}
                  // value={selectedContract ? selectedContract.friendName : ''}
                  onChange={(e) => setFriendNameText(e.target.value)}
                  margin="normal"
                  label="Свидетель"
                  variant="outlined"
                />
                <TextField
                  value={friendNumberText}
                  // value={selectedContract ? selectedContract.friendNumber : ''}
                  onChange={(e) => setFriendNumberText(e.target.value)}
                  margin="normal"
                  label="Номер телефона"
                  variant="outlined"
                />
                <Button onClick={handleUpdateContract} sx={{ mb: 2, mt: 1 }} variant="contained">
                  Изменить Контракт
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={showOpen}
        onClose={handleShowClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={ShowStyle}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
            <Typography sx={{ textAlign: 'center', fontSize: '32px', ml: 28 }}>Контракт</Typography>
            <img
              onClick={handleShowClose}
              style={{ marginRight: 30, cursor: 'pointer' }}
              src={close}
              alt="Close"
            />
          </Box>
          <Box sx={{ marginTop: '10px', position: 'relative' }}>
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '32px',
                    pb: '10px',
                  }}>
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
                {/* 
              {contracts.map((item, index) => (
                <div key={item}> */}
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '700',
                  }}>
                  {titleText}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '700',
                    mb: 2,
                  }}>
                  {descriptionText}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '700',
                    mb: '28px',
                  }}>
                  {dateFromText && dateToText
                    ? `${new Date(dateFromText).toLocaleString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })} - ${new Date(dateToText).toLocaleString('ru-RU', {
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
                  Награда: {rewardText}
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
                  Наказание:{punishmentText}
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
                      {dateFromText
                        ? `${new Date(dateFromText).toLocaleString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })} `
                        : ''}
                    </span>
                    <br /> по{' '}
                    <span style={{ fontWeight: 700, fontFamily: '"Montserrat", sans-serif' }}>
                      {dateToText
                        ? ` ${new Date(dateToText).toLocaleString('ru-RU', {
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
                    Свидетель: {friendNameText} ({friendNumberText})
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: '32px', pt: '14px' }}>
                    <img src={done} alt="Done" />
                    <Typography sx={{ ml: '10px', fontFamily: '"Montserrat", sans-serif' }}>
                      Подписано{' '}
                      {dateFromText
                        ? `${new Date(dateFromText).toLocaleString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })} `
                        : ''}
                    </Typography>
                  </Box>
                </Box>
                {/* </div>
              ))} */}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: '-5px',
          left: '230px',
          color: '#fff  ',
        }}>
        <MoreHorizIcon fontSize="large" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {tabValue === 0 && (
          <div>
            <MenuItem onClick={handleComplete}>Выполнить</MenuItem>
            <MenuItem onClick={handleArchived}>В Архив</MenuItem>
            <MenuItem onClick={handleDelete}>Удалить</MenuItem>{' '}
            <MenuItem onClick={handleJoinOpen}>Изменить Контракт</MenuItem>{' '}
            <MenuItem onClick={handleShowOpen}>Открыть</MenuItem>{' '}
          </div>
        )}
        {tabValue === 1 && (
          <div>
            <MenuItem onClick={handleOnGoing}>В Текущие</MenuItem>
            <MenuItem onClick={handleArchived}>В Архив</MenuItem>
            <MenuItem onClick={handleDelete}>Удалить</MenuItem>{' '}
            <MenuItem onClick={handleJoinOpen}>Изменить Контракт</MenuItem>
            <MenuItem onClick={handleShowOpen}>Открыть</MenuItem>{' '}
          </div>
        )}
        {tabValue === 2 && (
          <div>
            <MenuItem onClick={handleOnGoing}>В Текущие</MenuItem>
            <MenuItem onClick={handleComplete}>Выполнить</MenuItem>
            <MenuItem onClick={handleDelete}>Удалить</MenuItem>{' '}
            <MenuItem onClick={handleJoinOpen}>Изменить Контракт</MenuItem>
            <MenuItem onClick={handleShowOpen}>Открыть</MenuItem>{' '}
          </div>
        )}
      </Menu>
    </div>
  );
}
