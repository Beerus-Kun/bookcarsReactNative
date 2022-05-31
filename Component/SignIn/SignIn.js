import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Image, Alert } from 'react-native';
import {
    updateAddress, initial,
    updateFirstName, updateLastName,
    updateGender, updateIsLog,
    updatePhonenumber, updateToken,
    updateUserRole, updateDriverRole,
    logout, updateUsername, updateEmail
} from '../../Redux/informationSlices';
import { updateReceiveTrip, updateChangeState } from '../../Redux/driverSlices'
import { useDispatch } from 'react-redux';
import styles from './style';
import global from "../../global";
import firebase from '../../Firebase'

export default function SignIn({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const dispatch = useDispatch();

    const errFromAPI = (res) => {
        if (res.code == 406) {
            console.log(username)
            console.log(password)
            setIsErr(true);
            setMessage('Mật khẩu hoặc tài khoản không đúng');
        }
        if (res.code == 400) {
            setIsErr(true);
            setMessage('Vui lòng nhập lại');
        }
        if (res.code == 418) {
            Alert.alert(
                "Thông báo",
                "Tài khoản của bạn đã bị khóa",
                [
                    // {
                    //     text: "Cancel",
                    //     onPress: () => console.log("Cancel Pressed"),
                    //     style: "cancel"
                    // },
                    { text: "OK", onPress: () => { } }
                ]
            );
        }
        if (res.code == 202) {
            dispatch(updateIsLog(true));
            dispatch(updateFirstName(res.first_name));
            dispatch(updateLastName(res.last_name));
            dispatch(updateToken(res.accessToken))
            dispatch(updateEmail(res.email))

            let num_role = 0;

            for (let role of res.role) {
                if (role.id_role == 2) {
                    if (role.is_active == true) {
                        dispatch(updateUserRole(true));
                        dispatch(updateReceiveTrip(false))
                        num_role += 1;
                    }
                    else
                        dispatch(updateUserRole(false))
                }
                else if (role.id_role == 3) {
                    if (role.is_active == true) {
                        dispatch(updateDriverRole(true))
                        dispatch(updateReceiveTrip(true))
                        num_role += 1
                    }
                    else
                        dispatch(updateDriverRole(false))
                }
            }

            if(num_role == 2){
                dispatch(updateChangeState(true))
            }

            firebase.auth().signInWithEmailAndPassword(res.email, password);
            const unsubscribe = firebase
                .auth()
                .onAuthStateChanged((authUser) => {
                    // console.log(authUser);
                    if (authUser) {
                        // navigation.navigate('Chat', { item: user });
                        // navigation.navigate('ListBookingScreen');
                        console.log('logined')
                    }
                });
        }
    }

    const onSignIn = async () => {
        setIsLoad(true);
        // goi api va luu vao 202, 400, 406
        if (username && password) {
            await fetch(`${global.urlAPI}account/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${resAPI.accessToken}`
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    errFromAPI(responseJson)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setIsErr(true);
            setMessage('Vui lòng điền thông tin');
        }

        navigation.navigate('root')
        setIsLoad(false);
    }

    const clickForgotPassword = () => {
        navigation.navigate('forgotPassword');
        // console.log(navigation)
    }

    const clickRegistration = () => {
        navigation.navigate('signup')
    }

    return (
        <View style={{ flex: 1 }}>
            {isLoad ? (<ActivityIndicator size="large" color='red' />) : null}

            <View style={styles.logoSection}>
                <Image
                    source={require('../../assets/grab.jpg')}
                    style={styles.logo}
                />
            </View>


            <View style={styles.mainSection}>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email hoặc sdt hoặc username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <Text style={styles.text} >Mật khẩu</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                {isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > {message} </Text></View>) : null}

                <View style={styles.loginButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignIn}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.extraFeature}>
                    <Text onPress={clickRegistration} style={styles.forgot}>Đăng ký tài khoản</Text>
                    <Text onPress={clickForgotPassword} style={styles.forgot}>Quên mật khẩu</Text>
                </View>
            </View>
        </View>
    )
}