import React from 'react';

import Category from '../components/Category';
import Header from '../components/Header';
import Widget from '../components/WidgetComponents/Widget';
import { Container } from '@mui/material';
import ContractContent from '../components/ContractsComponent/ContractContent';

const Contracts = () => {
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
            <ContractContent />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contracts;
