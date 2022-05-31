import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from '@reduxjs/toolkit'
const informationSlice = createSlice({
    name: 'information',
    initialState: {
        username: '',
        firstName: '',
        lastName: '',
        token: '',
        phonenumber: '',
        address: '',
        gender: -1,
        isLog: false,
        userRole: false,
        driverRole: false,
        email: ''
    },
    reducers: {
        updateUsername(state, action) {
            state.username = action.payload;
            AsyncStorage.setItem('username', action.payload);
        },
        updateFirstName(state, action) {
            state.firstName = action.payload;
            AsyncStorage.setItem('firstName', action.payload);
        },
        updateLastName(state, action) {
            state.lastName = action.payload;
            AsyncStorage.setItem('lastName', action.payload);
        },
        updateToken(state, action) {
            state.token = action.payload;
            AsyncStorage.setItem('token', action.payload);
        },
        updateAddress(state, action) {
            state.address = action.payload;
            AsyncStorage.setItem('address', action.payload);
        },
        updateGender(state, action) {
            state.gender = action.payload;
            AsyncStorage.setItem('gender', action.payload);
        },
        updateIsLog(state, action) {
            state.isLog = action.payload;
            AsyncStorage.setItem('isLog', action.payload ? 'true' : 'false');
        },
        updateUserRole(state, action) {
            state.userRole = action.payload;
            AsyncStorage.setItem('userRole', action.payload ? 'true' : 'false');
        },
        updateDriverRole(state, action) {
            state.driverRole = action.payload;
            AsyncStorage.setItem('driverRole', action.payload ? 'true' : 'false');
        },
        updatePhonenumber(state, action) {
            state.phonenumber = action.payload;
            AsyncStorage.setItem('phonenumber', action.payload);
        },
        updateEmail(state, action) {
            state.email = action.payload;
            AsyncStorage.setItem('email', action.payload);
        },
        logout: state => {
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.token = '';
            state.phonenumber = '';
            state.address = '';
            state.gender = '-1';
            state.isLog = false;
            state.userRole = false;
            state.driverRole = false;
            AsyncStorage.setItem('username', state.username);
            AsyncStorage.setItem('firstName', state.firstName);
            AsyncStorage.setItem('lastName', state.lastName);
            AsyncStorage.setItem('token', state.token);
            AsyncStorage.setItem('phonenumber', state.phonenumber);
            AsyncStorage.setItem('address', state.address);
            AsyncStorage.setItem('gender', state.gender);
            AsyncStorage.setItem('isLog', 'false');
            AsyncStorage.setItem('userRole', 'false');
            AsyncStorage.setItem('driverRole', 'false');
        },
        initial: state => {
            if (AsyncStorage.getItem('isLog') == 'true' ? true : false) {
                // state.username = await AsyncStorage.getItem('username');
                // state.firstName = await AsyncStorage.getItem('firstName');
                // state.lastName = await AsyncStorage.getItem('lastName');
                // state.token = await AsyncStorage.getItem('token');
                // state.phonenumber = await AsyncStorage.getItem('phonenumber');
                // state.address = await AsyncStorage.getItem('address');
                // state.gender = await AsyncStorage.getItem('gender');
                // state.isLog = await AsyncStorage.getItem('isLog') == 'true' ? true : false;
                // state.userRole = await AsyncStorage.getItem('userRole') == 'true' ? true : false;
                // state.driverRole = await AsyncStorage.getItem('driverRole') == 'true' ? true : false;
                // if (isLog == 'true') {
                state.username = AsyncStorage.getItem('username');
                state.firstName = AsyncStorage.getItem('firstName');
                state.lastName = AsyncStorage.getItem('lastName');
                state.token = AsyncStorage.getItem('token');
                state.phonenumber = AsyncStorage.getItem('phonenumber');
                state.address = AsyncStorage.getItem('address');
                state.gender = AsyncStorage.getItem('gender');
                // state.isLog = AsyncStorage.getItem('isLog') == 'true' ? true : false;
                state.userRole = AsyncStorage.getItem('userRole') == 'true' ? true : false;
                state.driverRole = AsyncStorage.getItem('driverRole') == 'true' ? true : false;
                // }
            }
        }
    }
})

export const { updateAddress, initial,
    updateFirstName, updateLastName,
    updateGender, updateIsLog,
    updatePhonenumber, updateToken,
    updateUserRole, updateDriverRole,
    logout, updateUsername, updateEmail } = informationSlice.actions;
export default informationSlice.reducer;