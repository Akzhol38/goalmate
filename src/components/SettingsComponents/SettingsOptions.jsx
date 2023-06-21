import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SettingsOptions() {
  const [currentOption, setCurrentOption] = React.useState(0);
  const options = ['Общие настройки', 'Изменить пароль'];
  const navigate = useNavigate();

  const handleClick = (index) => {
    setCurrentOption(index);
    switch (index) {
      case 0:
        navigate('/settings');
        break;
      case 1:
        navigate('/settings/changePassword');
        break;
      default:
        navigate('/settings');
    }
    console.log(index);
  };

  React.useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/settings':
        setCurrentOption(0);
        break;
      case '/settings/changePassword':
        setCurrentOption(1);
        break;
      default:
        setCurrentOption(0);
    }
    console.log(path);
  }, [location]);

  return (
    <Card sx={{ width: 400, height: 'auto', mt: 15, ml: 5, pb: 1 }}>
      <Box sx={{ display: 'flex', mb: '24px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-between',
            pl: '6px',
          }}>
          {options.map((option, index) => (
            <div onClick={() => handleClick(index)}>
              <Button
                className="category-btn"
                sx={{
                  backgroundColor: currentOption === index ? '#0000000D' : '',
                  color: 'black',
                  marginTop: '10px',
                  paddingLeft: 5,
                  paddingRight: 5,
                  '&:hover': {
                    backgroundColor: '#0000000D',
                  },
                }}>
                {option}
              </Button>
            </div>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
