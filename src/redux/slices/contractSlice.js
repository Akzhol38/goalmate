import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  doneCon: [],
  archiCon: [],
  status: 'loading',
};

const contractSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setContractData: (state, action) => {
      state.items = action.payload;
    },
    setContractDone: (state, action) => {
      state.doneCon = action.payload;
    },
    setContractArchived: (state, action) => {
      state.archiCon = action.payload;
    },
    deleteContract: (state, action) => {
      const contractId = action.payload;
      state.items = state.contracts.items.filter((contract) => contract.id !== contractId);
      state.doneCon = state.contracts.doneCon.filter((contract) => contract.id !== contractId);
      state.archiCon = state.contracts.archiCon.filter((contract) => contract.id !== contractId);
    },
  },
});

export const { setContractData, setContractDone, setContractArchived, deleteContract } =
  contractSlice.actions;
export const contractReducer = contractSlice.reducer;
