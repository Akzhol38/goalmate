import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import {
  deleteContract,
  setContractArchived,
  setContractData,
  setContractDone,
} from '../../redux/slices/contractSlice';
import axios from 'axios';
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const onData = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:9088/api/v1/contracts/${id}/change-status?status=ONGOING`,
      );
      dispatch(setContractData(data));
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

  return (
    <div>
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
          </div>
        )}
        {tabValue === 1 && (
          <div>
            <MenuItem onClick={handleOnGoing}>В Текущие</MenuItem>
            <MenuItem onClick={handleArchived}>В Архив</MenuItem>
            <MenuItem onClick={handleDelete}>Удалить</MenuItem>{' '}
          </div>
        )}
        {tabValue === 2 && (
          <div>
            <MenuItem onClick={handleOnGoing}>В Текущие</MenuItem>
            <MenuItem onClick={handleComplete}>Выполнить</MenuItem>
            <MenuItem onClick={handleDelete}>Удалить</MenuItem>{' '}
          </div>
        )}
      </Menu>
    </div>
  );
}
