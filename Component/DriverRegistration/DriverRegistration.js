import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style';

export default function DriverRegistration({ navigation }) {
    const token = useSelector((state) => state.information.token)
    const [isSend, setIsSend] = useState(false);
    const [driving_license, setDriving_license] = useState('');
    const [number_plate, setNumber_plate] = useState('');
    // const [id_transport_detail, setId_transport_detail] = useState(0);
    // const [password, setPassword] = useState('');

    const clickRegMotor = async () => {
        await fetch(`http://192.168.43.170:8000/account/to_driver`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "driving_license": driving_license,
                "number_plate": number_plate,
                "id_transport_detail": 1
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.code == 400){
                    Alert.alert(
                        "Thông báo",
                        "Vui lòng nhập đủ thông tin",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { navigation.navigate('root') } }
                        ]
                    );
                }else{
                    Alert.alert(
                        "Thông báo",
                        "Bạn đã trở thành tài xế. Vui thoát và đăng nhập lại",
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

    const clickRegCar = async () => {
        await fetch(`http://192.168.43.170:8000/account/to_driver`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "driving_license": driving_license,
                "number_plate": number_plate,
                "id_transport_detail": 2
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.code == 400){
                    Alert.alert(
                        "Thông báo",
                        "Vui lòng nhập đủ thông tin",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { navigation.navigate('root') } }
                        ]
                    );
                }else{
                    Alert.alert(
                        "Thông báo",
                        "Bạn đã trở thành tài xế. Vui thoát và đăng nhập lại",
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
                    <Text style={styles.textTitle} > Mã bằng lái xe: </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="465846224"
                        autoCapitalize="none"
                        value={driving_license}
                        onChangeText={text => setDriving_license(text)}
                        underlineColorAndroid="transparent"
                        // editable={editableUsername}
                    />

                    <Text style={styles.textTitle} > Biển số xe: </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="51H-13579"
                        autoCapitalize="none"
                        value={number_plate}
                        onChangeText={text => setNumber_plate(text)}
                        underlineColorAndroid="transparent"
                        // editable={editableUsername}
                    />

                    <TouchableOpacity style={styles.signInContainer} onPress={clickRegMotor} >
                        <Text style={styles.signInTextStyle}>Đăng ký tài xế xe máy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signInContainer} onPress={clickRegCar} >
                        <Text style={styles.signInTextStyle}>Đăng ký tài xế xe hơi</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </ScrollView>
    )
}