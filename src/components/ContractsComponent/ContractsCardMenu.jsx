import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { setContractDone } from '../../redux/slices/contractSlice';
import axios from 'axios';
export default function ContractsCardMenu({ id, handleCompleteContract }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

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
  const handleClose = () => {
    setAnchorEl(null);
    onSubmit();
    handleCompleteContract(id);
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
        <MenuItem onClick={handleClose}>Выполнить</MenuItem>
        <MenuItem onClick={handleClose}>В Архив</MenuItem>
      </Menu>
    </div>
  );
}
