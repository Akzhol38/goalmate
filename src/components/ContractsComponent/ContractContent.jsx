import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import CreateContracts from './CreateContracts';
import ContractsCard from './ContractsCard';
import PaginationCon from '../Pagination';
import axios from 'axios';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ContractContent() {
  const [value, setValue] = React.useState(0);
  const [contracts, setContracts] = React.useState([]);

  const [completedContracts, setCompletedContracts] = React.useState([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  // const handleCompleteContract = (contractId) => {
  //   // const updatedContracts = contracts.filter((contract) => contract.id !== contractId);

  //   const completedContract = contracts.find((contract) => contract.id === contractId);
  //   setContracts(updatedContracts);
  //   setCompletedContracts([...completedContracts, completedContract]);
  //   const completedContractsFromStorage =
  //     JSON.parse(localStorage.getItem('completedContracts')) || [];
  //   localStorage.setItem(
  //     'completedContracts',
  //     JSON.stringify([...completedContractsFromStorage, completedContract]),
  //   );
  // };
  // const handleCompleteContract = async (contractId) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:9088/api/v1/contracts/${contractId}/change-status?status=DONE`,
  //     );
  //     const updatedContracts = contracts.filter((contract) => contract.id !== contractId);
  //     // const completedContract = contracts.find((contract) => contract.id === contractId);
  //     setContracts(updatedContracts);
  //     setCompletedContracts([...completedContracts, completedContract]);
  //     const completedContractsFromStorage =
  //       JSON.parse(localStorage.getItem('completedContracts')) || [];
  //     localStorage.setItem(
  //       'completedContracts',
  //       JSON.stringify([...completedContractsFromStorage, completedContract]),
  //     );
  //   } catch (error) {
  //     console.warn(error);
  //     alert('Ошибка при изменении статуса контракта');
  //   }
  // };

  const handleCompleteContract = async (contractId) => {
    try {
      await axios.put(
        `http://localhost:9088/api/v1/contracts/${contractId}/change-status?status=DONE`,
      );

      const completedContract = contracts.find((contract) => contract.id === contractId);
      const updatedContracts = contracts.filter((contract) => contract.id !== contractId);

      setContracts(updatedContracts);
      setCompletedContracts([...completedContracts, completedContract]);

      const completedContractsFromStorage =
        JSON.parse(localStorage.getItem('completedContracts')) || [];
      localStorage.setItem(
        'completedContracts',
        JSON.stringify([...completedContractsFromStorage, completedContract]),
      );
    } catch (error) {
      console.warn(error);
      alert('Ошибка при изменении статуса контракта');
    }
  };

  const id = window.localStorage.getItem('id');
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:9088/api/v1/contracts/users/${id}`);

      setContracts(data);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при получения статьи');
    }
  };

  React.useEffect(() => {
    fetchData();
    const completedContractsFromStorage =
      JSON.parse(localStorage.getItem('completedContracts')) || [];
    setCompletedContracts(completedContractsFromStorage);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = contracts?.slice(startIndex, endIndex);
  const currentCompData = completedContracts?.slice(startIndex, endIndex);

  return (
    <Card
      sx={{
        width: '922px',
        height: '900px',
        mt: 15,
        ml: 5,
      }}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab label="Текущие" {...a11yProps(0)} />
            <Tab label="Выполненные" {...a11yProps(1)} />
            <Tab label="Архив" {...a11yProps(2)} />
            <CreateContracts />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {contracts ? (
            currentData.map((obj, index) => (
              <ContractsCard
                key={index}
                title={obj.title}
                dateFrom={obj.dateFrom}
                dateTo={obj.dateTo}
                ids={obj.id}
                handleCompleteContract={handleCompleteContract}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
          <div
            style={{
              position: 'absolute',
              top: '992px',
              right: '320px',
              // backgroundColor: 'red',
            }}>
            <PaginationCon
              currentPage={currentPage}
              pageSize={pageSize}
              itemsCount={contracts.length}
              handlePageChange={handlePageChange}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {completedContracts ? (
            currentCompData.map((obj, index) => (
              <ContractsCard
                key={index}
                title={obj.title}
                dateFrom={obj.dateFrom}
                dateTo={obj.dateTo}
                ids={obj.id}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
          {/* <PaginationCon
            currentPage={currentPage}
            pageSize={pageSize}
            itemsCount={completedContracts.length}
            handlePageChange={handlePageChange}
          /> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Card>
  );
}
