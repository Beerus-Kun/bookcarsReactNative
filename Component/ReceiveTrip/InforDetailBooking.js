import react, { useState, useLayoutEffect, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from './colors.jsx';
import firebase, { firestore } from '../../Firebase';
import global from '../../global';

// phần này là hiển thị màn hình để driver xác nhân chuyến đi.

const DetailCustomer = ({ navigation, route }) => {
    const [isReceive, setIsReceive] = useState(false);
    // const [flag, setFlag] = useState(false);
    const [chats, setChats] = useState([]);
    const [phone, setPhone] = useState('');
    // const [driver, setDriver] = useState('');
    const [phone1, setPhone1] = useState('');
    const [customer, setCustomer] = useState('');
    const [driver, setDriver] = useState('');
    const [idReceive, setIDReceive] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [chatId, setIdChats] = useState('');
    const email = firebase.auth().currentUser.email;
    const [flag, setFlag] = useState(false);

    const onChat = () => {
        const user = {
            _id: chats[0].id,
            _chatName: phone1,
        };
        console.log(user);
        navigation.navigate('chatScreen', { object: user });
    }

    const deleteBookingOnFirebase = async () => {
        // lấy id của chuyến vừa booking

        console.log(idReceive);

        //xóa đi chuyến vừa mới đặt
            firebase
                .firestore()
                .collection('receiveBookCars')
                .doc(idReceive)
                .delete()
                .catch((e) => alert(e));

    };

    const deleteMessageFirebase = async () => {

        //xóa rooom chat trong chuyến xe vừa rồi
            firebase
                .firestore()
                .collection('chats')
                .doc(chatId)
                .delete()
                .catch((e) => alert(e));
       
    };

    const finished = () => {
        fetch(`${global.urlAPI}person/api/update_booking_finished?id=${route.params.id}`)
            .then((response) => response.json())
            .then((json) => {
                setListCustomer(json);
                // console.log(json)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });

        deleteBookingOnFirebase();
        deleteMessageFirebase();
        navigation.navigate('tripDetail')
    }

    useEffect(() => {
        console.log(
            `${global.urlAPI}person/api/get_booking_by_id?id=` + route.params.id
        );
        fetch(`${global.urlAPI}person/api/get_booking_by_id?id=` + route.params.id)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setCustomer(json);
            })
            .catch((error) => console.error(error));

        fetch(
            `${global.urlAPI}person/api/get_driver_by_mail?mail=` +
            firebase.auth().currentUser.email
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDriver(json);
            })
            .catch((error) => console.error(error));

        fetch(
            `${global.urlAPI}person/api/get_phone_by_mail?mail=` +
            firebase.auth().currentUser.email
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setPhone(json);
            })
            .catch((error) => console.error(error));
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
                        setPhone1(doc.data().driverPhone);
                        // setIsReceive(true);
                        setChats(arr);
                        setFlag(true)
                    } else if (doc.data().driverMail === email) {
                        setPhone1(doc.data().customerPhone);
                        const arr = [{ id: doc.id, data: doc.data() }];
                        // setIsReceive(true);
                        setChats(arr);
                        setFlag(true)
                    }
                });
            });
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Customer Detail',
            headerBackTitleVisible: false,
        });
    }, [navigation]);

    const acceptBooking = () => {
        fetch(
            `${global.urlAPI}person/api/update_booking_receive?mail=` +
            firebase.auth().currentUser.email +
            '&id=' +
            route.params.id
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setNumberPlate(json);
            })
            .catch((error) => console.error(error));
        const info = {
            driver: driver,
            start_point: customer.start_point,
            end_point: customer.end_point,
            total: customer.total,
        };

        firebase
            .firestore()
            .collection('receiveBookCars')
            .add({
                receiveName: customer.mail,
                driverMail: firebase.auth().currentUser.email,
                info,
            })
            .catch((error) => {
                alert(error);
            });
        alert('success');

        // khởi tạo room chat
        // console.log('Create romChatWithNameUser');
        console.log(phone);
        const mail = {
            customer: customer.mail,
            driverMail: firebase.auth().currentUser.email,
        };
        firebase
            .firestore()
            .collection('chats')
            .add({
                driverMail: firebase.auth().currentUser.email,
                chatName: customer.mail,
                customerPhone: customer.phone_number,
                driverPhone: phone.phone_number,
            })
            .catch((error) => {
                alert(error);
            });
            setTimeout(() => {
            firebase
            .firestore()
            .collection('receiveBookCars')
            .where('driverMail', '==', email)
            .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => setIDReceive(doc.id));
            });

            firebase
            .firestore()
            .collection('chats')
            .where('driverMail', '==', email)
            .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => setIdChats(doc.id));
            });

        }, 1000);
        //navigation.navigate('ve lai giao dien map',{mail:customer.mail});
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View style={style.imageContainer}>
                <Avatar
                    rounded
                    size={'xlarge'}
                    source={{
                        uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png',
                    }}
                />
                <Text style={style.textCustomerName}>
                    <Icon name="info" size={24} color={'blue'} />
                    {customer.full_name}
                </Text>
                <Text style={style.textCustomerName}>
                    <Icon name="phone" size={30} color={'blue'} />
                    {customer.phone_number}
                </Text>
                {flag ? (
                    <Text style={style.textCustomerName} onPress={onChat}>
                        <Icon name="add-comment" size={30} color={'blue'} />
                    </Text>
                ) : null}

            </View>
            <View style={style.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}
                >
                    <View style={style.line} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Booking detail
                    </Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        Price of booking:
                    </Text>
                    <View style={style.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            {customer.total}$
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About</Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}
                    >
                        <Ionicons name="location" size={22} color={'red'} />
                        Go from: {customer.start_point} to: {customer.end_point}
                    </Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}
                    >
                        <Ionicons name="calendar-outline" size={22} color={'blue'} />
                        Date time: {customer.date}
                    </Text>
                </View>
            </View>
            <View style={style.containerBtn}>
                {flag ? (
                    <TouchableOpacity style={style.acceptBtn} onPress={finished}>
                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            Hoàn thành
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={style.acceptBtn} onPress={acceptBooking}>
                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            Accept
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView >
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
        position: 'relative',
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    acceptBtn: {
        width: '50%',
        height: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: COLORS.green,
        width: '40%',
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        padding: 20,
    },
    textCustomerName: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 10,
        position: 'relative',
    },
});

export default DetailCustomer;
