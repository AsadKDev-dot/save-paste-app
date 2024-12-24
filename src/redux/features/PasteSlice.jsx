import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:JSON.parse(localStorage.getItem("pastes")) || []
}

export const PasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Ensure state.pastes is an array
      if (!Array.isArray(state.pastes)) {
        state.pastes = [];
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // If the paste already exists
        toast.error("Paste already exists");
        return;
      }

      // Add the paste if it doesn't exist
      state.pastes.push(paste);

      // Update localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // Show success message
      toast.success("Paste added");
    },
    updatePaste: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if(index >= 0){
        state.pastes[index]= paste;
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success("Updated Successfully!")
      }
      else{
        toast.error("Paste Not Exist!")
      }

    },
    removePaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>item._id==paste);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem('pastes',JSON.stringify(state.pastes))
        toast.success("Deleted!")
      }
      else{
        toast.error('Record Not Exist')
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updatePaste, removePaste } = PasteSlice.actions

export default PasteSlice.reducer