import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contracts: {
    items: [],
    doneCon: [],
    archiCon: [],
    status: 'loading',
  },
};

const contractSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setContractData: (state, action) => {
      state.contracts.items = action.payload;
    },
    setContractDone: (state, action) => {
      state.contracts.doneCon = action.payload;
    },
    setContractArchived: (state, action) => {
      state.contracts.archiCon = action.payload;
    },
    deleteContract: (state, action) => {
      const contractId = action.payload;
      state.contracts.items = state.contracts.items.filter(
        (contract) => contract.id !== contractId,
      );
      state.contracts.doneCon = state.contracts.doneCon.filter(
        (contract) => contract.id !== contractId,
      );
      state.contracts.archiCon = state.contracts.archiCon.filter(
        (contract) => contract.id !== contractId,
      );
    },
  },
});

export const { setContractData, setContractDone, setContractArchived, deleteContract } =
  contractSlice.actions;
export const contractReducer = contractSlice.reducer;
