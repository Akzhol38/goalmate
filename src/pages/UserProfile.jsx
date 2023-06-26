import React from 'react';

import { Container } from '@mui/material';

import Header from '../components/Header';
import Widget from '../components/WidgetComponents/Widget';
import Category from '../components/Category';
import OtherAccount from '../components/WidgetComponents/OtherAccount';
import ProfileDetails from '../components/ProfileDetails';

const UserProfile = () => {
  return (
    <div className="profile">
      <Header />
      <Container maxWidth="xl">
        <div className="profile__inner" style={{ display: 'flex', marginLeft: '64px' }}>
          <div>
            <Widget />
            <Category />
          </div>
          <div style={{ mt: 5 }}>
            <ProfileDetails />
          </div>
          <div>
            <OtherAccount />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
