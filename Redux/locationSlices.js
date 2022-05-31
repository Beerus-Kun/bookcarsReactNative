import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setDepartSite = createAsyncThunk('location/setDepartSite', async (params, thunkAPI) => {
    thunkAPI.dispatch(updateDepartSite(params.departSite));
    thunkAPI.dispatch(updateXDepartSite(params.xDepartSite));
    thunkAPI.dispatch(updateYDepartSite(params.yDepartSite));
})

export const setDestination = createAsyncThunk('location/setDestination', async (params, thunkAPI) => {
    thunkAPI.dispatch(updateDestination(params.destination));
    thunkAPI.dispatch(updateXDestination(params.xDestination));
    thunkAPI.dispatch(updateYDestination(params.yDestination));
})


const locationSlices = createSlice({
    name: 'location',
    initialState: {
        departSite: '',
        // xDepartSite: 10.8486375,
        // yDepartSite: 106.7856918,
        xDepartSite: null,
        yDepartSite: null,
        destination: '',
        xDestination: null,
        yDestination: null,
        distance: 0,
        loading: false
    },
    reducers: {
        updateDepartSite(state, action) {
            console.log(action.payload)
            state.departSite = action.payload;
        },
        updateXDepartSite(state, action) {
            state.xDepartSite = action.payload;
        },
        updateYDepartSite(state, action) {
            state.yDepartSite = action.payload;
        },
        updateDestination(state, action) {
            state.destination = action.payload;
        },
        updateXDestination(state, action) {
            state.xDestination = action.payload;
        },
        updateYDestination(state, action) {
            state.yDestination = action.payload;
        },
        updateDistance(state, action) {
            state.distance = action.payload
        },
        clear(state) {
            state.departSite = '';
            state.destination = '';
            state.xDepartSite = null;
            state.yDepartSite = null;
            state.xDestination = null;
            state.yDestination = null;
        }
    },
    extraReducers: {
        [setDepartSite.pending]: (state) => {
            state.loading = true;
        },
        [setDepartSite.rejected]: (state) => {
            state.loading = false;
        },
        [setDepartSite.fulfilled]: (state) => {
            state.loading = false;
        },
        [setDestination.pending]: (state) => {
            state.loading = true;
        },
        [setDestination.rejected]: (state) => {
            state.loading = false;
        },
        [setDestination.fulfilled]: (state) => {
            state.loading = false;
        },
    }
})

export const { updateDepartSite, updateDestination,
    updateXDepartSite, updateXDestination,
    updateYDepartSite, updateYDestination,
    updateDistance, clear } = locationSlices.actions;

export const locationSelector = state => state.location

export default locationSlices.reducer;