
import { createSlice } from '@reduxjs/toolkit'
const driverSlice = createSlice({
    name: 'driver',
    initialState: {
        receiveTrip: false,
        changeState: false
    },
    reducers: {
        updateReceiveTrip(state, action){
            state.receiveTrip = action.payload;
        },
        updateChangeState(state, action){
            state.changeState = action.payload;
        },
    }
})

export const { updateReceiveTrip, updateChangeState } = driverSlice.actions;
export default driverSlice.reducer;