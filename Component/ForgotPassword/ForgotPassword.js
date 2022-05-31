import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';
import styles from './style';

export default function ForgotPassword({navigation}) {
    const [isSend, setIsSend] = useState(false);
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [editableUsername, setEditableUsername] = useState(true);
    const [password, setPassword] = useState('');

    //     username, code, new_password
    //     409, 202, 415, 416, 400, 414, 213

    const clickSendCode = async () => {
        await fetch(`http://192.168.43.170:8000/account/forgot_password`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "username": username
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 414) {
                    Alert.alert(
                        "Thông báo",
                        "Thông tin tài khoản không đúng, vui lòng nhập lại",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                } else if (responseJson.code == 213) {
                    setIsSend(true);
                    setEditableUsername(false);
                    Alert.alert(
                        "Thông báo",
                        "Đã gửi mã vào email của bạn. Vui lòng kiểm tra email và nhập mã",
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
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const clickConfirmCode = async () => {
        await fetch(`http://192.168.43.170:8000/account/forgot_password`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "username": username,
                "code": code,
                "new_password": password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 409) {
                    Alert.alert(
                        "Thông báo",
                        "Mật khẩu phải lớn hơn 6 ký tự",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                } else if (responseJson.code == 415) {
                    Alert.alert(
                        "Thông báo",
                        "Mã phải là một chuỗi có 6 ký tự",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                }else if(responseJson.code == 416){
                    Alert.alert(
                        "Thông báo",
                        "Bạn nhập mã bảo mật sai. Vui lòng nhập lại",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                }else if(responseJson.code == 202){
                    Alert.alert(
                        "Thông báo",
                        "Đổi mật khẩu thành công.",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { navigation.navigate('root') } }
                        ]
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    return (
        <ScrollView>
            <View style={styles.wrapper} >
                <View style={styles.body}>
                    <Text style={styles.textTitle} > Email: </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email/ SDT/ username"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        underlineColorAndroid="transparent"
                        editable={editableUsername}
                    />

                    {isSend ? (
                        <View>
                            <View>
                                <Text style={styles.textTitle} > Nhập mã: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nhập mật mã trong email"
                                    autoCapitalize="none"
                                    value={code}
                                    keyboardType='numeric'
                                    onChangeText={text => setCode(text)}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <Text style={styles.textTitle} > Nhập mật khẩu mới: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="mật khẩu có hơn 6 ký tự"
                                    // autoCapitalize="none"
                                    value={password}
                                    // keyboardType='numeric'
                                    onChangeText={text => setPassword(text)}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry
                                />
                            </View>
                        </View>


                    ) : null}

                    {isSend ? (
                        <TouchableOpacity style={styles.signInContainer} onPress={clickConfirmCode} >
                            <Text style={styles.signInTextStyle}>Xác thực mã</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.signInContainer} onPress={clickSendCode} >
                            <Text style={styles.signInTextStyle}>Gửi mã</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>

        </ScrollView>
    )
}