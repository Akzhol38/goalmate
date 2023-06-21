import React from 'react';

import Category from '../components/Category';
import Header from '../components/Header';
import Widget from '../components/WidgetComponents/Widget';
import { Container } from '@mui/material';
import SettingsOptionsSec from '../components/SettingsComponents/SettingsOptionsSec';
import SettingsOptions from '../components/SettingsComponents/SettingsOptions';

const SettingsOpSec = () => {
  return (
    <div className="app">
      <Header />
      <Container maxWidth="xl">
        <div className="app__inner">
          <div>
            <Widget />
            <Category />
          </div>
          <div>
            <SettingsOptionsSec />
          </div>
          <div>
            <SettingsOptions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SettingsOpSec;
