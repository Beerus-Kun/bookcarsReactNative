import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {
    updateAddress, initial,
    updateFirstName, updateLastName,
    updateGender, updateIsLog,
    updatePhonenumber, updateToken,
    updateUserRole, updateDriverRole,
    logout, updateUsername
} from '../../Redux/informationSlices';
import styles from './style'
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

export default function Authentication({ navigation }) {
    // const dispatch = useDispatch();
    const [isSignIn, setIsSignIn] = useState(true);

    const signIn = () => {
        setIsSignIn(true);
    }

    const signUp = () => {
        setIsSignIn(false);
    }

    return (
        <View style={styles.container}>
            {isSignIn ? (<SignIn navigation={navigation} />) : (<SignUp />)}
            <View style={styles.controlStyle}>
                <TouchableOpacity style={styles.signInStyle} onPress={signIn}>
                    <Text style={isSignIn ? styles.activeStyle : styles.inactiveStyle}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpStyle} onPress={signUp}>
                    <Text style={!isSignIn ? styles.activeStyle : styles.inactiveStyle}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}