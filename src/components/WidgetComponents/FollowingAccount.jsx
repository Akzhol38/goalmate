import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowingsData } from '../../redux/slices/followingSlice';
export default function FollowingAccount({ username, id }) {
  console.log(id);
  const idUser = window.localStorage.getItem('id');
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = React.useState([]);

  // React.useEffect(() => {
  //   const followings = JSON.parse(localStorage.getItem('followings') || '[]');
  //   console.log(followings);
  //   setIsFollowing([followings].includes(id));
  // }, [id]);
  console.log(isFollowing.isFollowed);
  const onFollow = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:9088/api/v1/follow?userToId=${id}&userId=${idUser}`,
      );
      dispatch(setFollowingsData(data));
      setIsFollowing({ isFollowed: true });
      localStorage.setItem('followings', JSON.stringify(data));
      // setIsFollowing(true);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при подписке');
    }
  };

  const onUnFollow = () => {
    try {
      axios.post(`http://localhost:9088/api/v1/unfollow?userToId=${id}&userId=${idUser}`);
      setIsFollowing({ isFollowed: false });
      localStorage.removeItem('followings');
      // setIsFollowing(false);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при отписке');
    }
  };

  const checkFollowing = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9088/api/v1/check-following?userToId=${id}&userId=${idUser}`,
      );
      setIsFollowing(data);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при проверке подписке');
    }
  };
  React.useEffect(() => {
    checkFollowing();
  }, []);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pl: '16px', pb: '10px' }}>
      <Stack direction="row" spacing={1}>
        <Avatar
          alt="Remy Sharp"
          src="https://mui.com/static/images/avatar/2.jpg"
          sx={{ width: '35px', height: '35px' }}
        />
      </Stack>
      <Box sx={{ pl: '6px' }}>
        <Typography sx={{ fontWeight: 700 }}>{username}</Typography>
        <Typography variant="body2" color="text.secondary">
          Рекомендации для вас
        </Typography>
      </Box>
      <Typography
        sx={{ pl: 9, fontWeight: 700, cursor: 'pointer' }}
        onClick={isFollowing.isFollowed ? onUnFollow : onFollow}>
        {isFollowing.isFollowed ? 'Отписаться' : 'Подписаться'}
      </Typography>
    </Box>
  );
}
//isFollowing.isFollowed ? onUnFollow :
//isFollowing.isFollowed ? 'Отписаться' :
