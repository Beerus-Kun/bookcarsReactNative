import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import { useSelector } from 'react-redux'
import Alert from './Alert'
import firebase from '../../Firebase'

export default function Payment({ navigation }) {
    const [isReceive, setIsReceive] = useState(false);
    const [flag, setFlag] = useState(false);
    const [chats, setChats] = useState([]);
    const [phone, setPhone] = useState('');
    const [driver, setDriver] = useState('');
    const destination = useSelector((state) => state.location.destination);
    const departSite = useSelector((state) => state.location.departSite);
    const distance = useSelector((state) => state.location.distance);
    const price = 50000;

    const onChat = () => {
        const user = {
            _id: chats[0].id,
            _chatName: phone,
        };
        console.log(user);
        navigation.navigate('chatScreen', { object: user });
    }

    useEffect(() => {
        console.log(global.getUsername + '1');
        const email = firebase.auth().currentUser.email;
        const unsubscribe = firebase
            .firestore()
            .collection('receiveBookCars')
            .where('receiveName', '==', email)
            .onSnapshot((snapshot) => {
                console.log(snapshot.docs.length);
                if (snapshot.docs.length === 0) {
                    setFlag(false);
                } else {
                    snapshot.docs.map((doc) => setDriver(doc.data().info));
                    setFlag(true);
                }
            });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const email = firebase.auth().currentUser.email;
        const unsubscribe = firebase
            .firestore()
            .collection('chats')
            .onSnapshot((snapshot) => {
                snapshot.docs.map(async (doc) => {
                    if (doc.data().chatName === email) {
                        const arr = [{ id: doc.id, data: doc.data() }];
                        console.log(arr[0].id);
                        setPhone(doc.data().driverPhone);
                        setIsReceive(true);
                        setChats(arr);
                    } else if (doc.data().driverMail === email) {
                        setPhone(doc.data().customerPhone);
                        const arr = [{ id: doc.id, data: doc.data() }];
                        setIsReceive(true);
                        setChats(arr);
                    }
                });
            });
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            {/* <View style={styles.titleSection}>
                <Text style={styles.titleText}></Text>
            </View> */}

            {flag === true ? (
                <Alert
                    key={1}
                    fullName={driver.driver.full_name}
                    numberPlate={driver.driver.number_plate}
                    phoneNumber={driver.driver.phone_number}
                    end_point={driver.end_point}
                    start_point={driver.start_point}
                    total={driver.total}
                    id={1}
                />
            ) : (
                false
            )}
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
                    <Text style={styles.contentText2}>{price}đ</Text>
                </View>
            </View>

            <View style={styles.contentSection}>
                <View style={styles.contentSection1}>
                    <Text style={styles.contentText1}>Trạng thái đơn hàng</Text>
                </View>
                <View style={styles.contentSection2}>
                    {isReceive ? (
                        <Text style={styles.contentText2}>Đang chạy</Text>
                    ) :
                        (
                            <Text style={styles.contentText2}>Đang chờ tài xế</Text>
                        )}

                </View>
            </View>
            {
                isReceive ? (
                    <View style={styles.chatSection}>
                        <TouchableOpacity style={styles.chatButton} onPress={onChat}>
                            <Text style={styles.chatText}>
                                Nhắn với tài xế
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.paymentSection}>
                        <TouchableOpacity style={styles.paymentButton}>
                            <Text style={styles.paymentText}>
                                Hủy đơn
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View >
    )
}