// import { createSlice } from "@reduxjs/toolkit";

// import toest, from 'react-hot-toast';
// const initialState = {
//     pastes:localStorage.getItem("pastes")
//     ?  JSON.parse(localStorage.getItem("pastes"))
//     :[]
// }

// export const pasteSlice = createSlice({
//     name: "paste",
//     initialState,
//     reducers: {
//        addToPastes: (state,action) =>{
// const paste = action.payload;
// state.pastes.push(paste);
// localStorage.setItem("pastes",state.pastes);
// toast("paste Created Successfully")
//        } ,
//        updateTOPastes: (state,action) =>{
        
//        },
//        resetAllPastes: (state,action) =>{
        
//        }, 
//        removeFromPastes: (state,action) =>{
        
//        },
      
//     },
// })

// export const {addToPastes, updateTOPastes, resetAllPastes,removeFromPastes} = pasteSlice.actions
// export default pasteSlice.reducer


import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Corrected import

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [],
};

export const pasteSlice = createSlice({
    name: "paste",
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));  // Save to localStorage
            toast("Paste created successfully");
        },
        updateTOPastes: (state, action) => {
            const updatedPaste = action.payload;
            const index = state.pastes.findIndex(paste => paste._id === updatedPaste._id);  // Find index by _id
            if (index !== -1) {
                state.pastes[index] = updatedPaste;  // Update the existing paste
                localStorage.setItem("pastes", JSON.stringify(state.pastes));  // Update localStorage
                toast("Paste updated successfully");
            } else {
                toast.error("Paste not found");
            }
        },
        resetAllPastes: (state) => {
            state.pastes = [];  // Clear the pastes array
            localStorage.removeItem("pastes");  // Remove from localStorage
            toast("All pastes reset successfully");
        },
        removeFromPastes: (state, action) => {
            const idToRemove = action.payload;  // Expecting the ID to remove
            state.pastes = state.pastes.filter(paste => paste._id !== idToRemove);  // Filter out the paste
            localStorage.setItem("pastes", JSON.stringify(state.pastes));  // Update localStorage
            toast("Paste removed successfully");
        },
    },
});

export const { addToPastes, updateTOPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
