import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import styles from './style'
import { useSelector } from 'react-redux'

export default function Payment({ navigation, route }) {
    const destination = useSelector((state) => state.location.destination);
    const departSite = useSelector((state) => state.location.departSite);
    const distance = useSelector((state) => state.location.distance);
    // const token = ;
    const email = useSelector((state) => state.information.email);

    const [token, setToken] = useState(useSelector((state) => state.information.token))
    const [balance, setBalance] = useState(0);
    // const navigation = aaa.navigation
    const total = route.params.total
    // setBalance(route.params.balance);
    // console.log(aaa)
    const price = 50000;

    const onPay = async () => {
        // console.log(navigation)

        await fetch("http://192.168.43.170:8000/booking/create", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "distance": distance,
                "total": total,
                "start_point": `${departSite}`,
                "end_point": `${destination}`
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // 400, 419, 216, 420
                if (responseJson.code == 419) {
                    Alert.alert(
                        "Thông báo",
                        "Tài khoản này đang đặt, không thể đặt thêm",
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                } else if (responseJson.code == 420) {
                    Alert.alert(
                        "Thông báo",
                        "Tài khoản không đủ tiền, vui lòng nạp thêm",
                        [
                            // {
                            //     text: "Cancel",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // },
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                } else if (responseJson.code == 216) {
                    navigation.push('waiting')
                }
            })
            .catch((err) => {
                console.log(err);
            });

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

    // useEffect(() => {
    //     fetch(`${global.urlAPI}account/information?info=12345678b&email=${email}`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             // 'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log(responseJson)
    //             if (responseJson.code == 211) {
    //                 // setCarFee(responseJson.car);
    //                 // setMotorFee(responseJson.motor);
    //                 setBalance(responseJson.balance)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // })

    return (
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <Text style={styles.titleText}>Kiểm tra thông tin</Text>
            </View>
            <View style={styles.contentSection}>
                <View style={styles.contentSection1}>
                    <Text style={styles.contentText1}>Nơi xuất phát</Text>
                </View>
                <View style={styles.contentSection2}>
                    <Text style={styles.contentText2}>{departSite}</Text>
                </View>
            </View>
            <View style={styles.contentSection}>
                <View style={styles.contentSection1}>
                    <Text style={styles.contentText1}>Nơi đến</Text>
                </View>
                <View style={styles.contentSection2}>
                    <Text style={styles.contentText2}>{destination}</Text>
                </View>
            </View>
            <View style={styles.contentSection}>
                <View style={styles.contentSection1}>
                    <Text style={styles.contentText1}>Độ dài</Text>
                </View>
                <View style={styles.contentSection2}>
                    <Text style={styles.contentText2}>{distance}</Text>
                </View>
            </View>
            <View style={styles.contentSection}>
                <View style={styles.contentSection1}>
                    <Text style={styles.contentText1}>Giá tiền</Text>
                </View>
                <View style={styles.contentSection2}>
                    <Text style={styles.contentText2}>{total}đ</Text>
                </View>
            </View>
            {/* <View style={styles.contentSection}>
                <View style={styles.contentSection1}>
                    <Text style={styles.contentText1}>Số tiền của bạn</Text>
                </View>
                <View style={styles.contentSection2}>
                    <Text style={styles.contentText2}>{balance}đ</Text>
                </View>
            </View> */}
            <View style={styles.paymentSection}>
                <TouchableOpacity style={styles.paymentButton} onPress={onPay}>
                    <Text style={styles.paymentText}>
                        Thanh toán
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}