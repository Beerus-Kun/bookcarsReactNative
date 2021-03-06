import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Firebase from '../../Firebase'
import styles from './style';
import global from "../../global";


export default function SignUp({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [repassword, setRepassword] = useState('');
    const [gender, setGender] = useState(0);
    const [address, setAddress] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [vdate, setVdate] = useState('')
    const [date, setDate] = useState('')

    const [errFirstname, setErrFirstname] = useState(false);
    const [errLastname, setErrLastname] = useState(false);
    const [errPhonenumber, setErrPhonenumber] = useState(false);
    const [errBirthDay, setErrBirthDay] = useState(false);
    const [errAddress, setErrAddress] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errUsername, setErrUsername] = useState(false);
    const [errPassword, setErrPassword] = useState(false);
    const [errRepassword, setErrRepassword] = useState(false);

    const [messFirstname, setMessFirstname] = useState('');
    const [messLastname, setMessLastname] = useState('');
    const [messPhonenumber, setMessPhonenumber] = useState('');
    const [messBirthDay, setMessBirthDay] = useState('');
    const [messAddress, setMessAddress] = useState('');
    const [messEmail, setMessEmail] = useState('');
    const [messUsername, setMessUsername] = useState('');
    const [messPassword, setMessPassword] = useState('');
    const [messRepassword, setMessRepassword] = useState('');


    const emptyErr = 'Vui l??ng kh??ng ????? tr???ng';

    const errFromAPI = (res) => {
        // 201, 400, 401, 402, 403, 404, 405, 407, 408, 409, 411
        console.log(res)
        if (res.code == 400) {
            setIsErr(true);
        }
        if (res.code == 401) {
            setIsErr(true);
            setErrEmail(true);
            setMessEmail('Email n??y ???? ???? ???????c ????ng k??')
        }
        if (res.code == 402) {
            setIsErr(true);
            setErrEmail(true);
            setMessEmail('Vui l??ng ??i???n ????ng email')
        }
        if (res.code == 403) {
            setIsErr(true);
            setErrPhonenumber(true);
            setMessPhonenumber('S??? ??i???n tho???i n??y ???? ???? ???????c ????ng k??')
        }
        if (res.code == 404) {
            setIsErr(true);
            setErrPhonenumber(true);
            setMessPhonenumber('S??? ??i???n tho???i kh??ng h???p l???')
        }
        if (res.code == 405) {
            setIsErr(true);
            setErrUsername(true);
            setMessUsername('T??n ????ng nh???p n??y ???? ???????c s??? d???ng')
        }
        if (res.code == 407) {
            setIsErr(true);
            setErrBirthDay(true);
            setMessBirthDay('B???n ph???i tr??n 18 tu???i')
        }
        if (res.code == 408) {
            setIsErr(true);
            setErrBirthDay(true);
            setMessBirthDay('Vui l??ng nh???p ????ng ?????nh d???ng dd-mm-yyyy')
        }
        if (res.code == 409) {
            setIsErr(true);
            setErrPassword(true);
            setErrRepassword(true);
            setMessPassword('Vui l??ng nh???p tr??n 6 k?? t???')
            setMessRepassword('Vui l??ng nh???p tr??n 6 k?? t???')
        }
        if (res.code == 201) {

            Firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    authUser.user.updateProfile({
                        displayName: firstName,
                    });
                })

            Alert.alert(
                "Th??ng b??o",
                "????ng k?? th??nh c??ng",
                [
                    { text: "OK", onPress: () => navigation.navigate('root') }
                ]
            );
        }
    }

    const onSignup = async () => {
        
        setIsLoad(true);

        setErrAddress(false);
        setErrBirthDay(false);
        setErrEmail(false);
        setErrFirstname(false);
        setErrLastname(false);
        setErrPassword(false);
        setErrPhonenumber(false);
        setErrRepassword(false);
        setErrUsername(false);
        setIsErr(false);

        if (lastName && firstName && phonenumber && vdate && address && email && username && password && repassword) {
            
            if (vdate.split('-').length != 3 || password != repassword) {
                if (vdate.split('-').length != 3) {
                    setIsErr(true);
                    setErrBirthDay(true);
                    setMessBirthDay('Vui l??ng nh???p ????ng ?????nh d???ng dd-mm-yyyy')
                }

                if (password != repassword) {
                    setIsErr(true);
                    setErrRepassword(true);
                    setMessRepassword('M???t kh???u v?? m???t kh???u nh???p l???i kh??ng kh???p')
                    setErrPassword(true);
                    setMessPassword('M???t kh???u v?? m???t kh???u nh???p l???i kh??ng kh???p')
                }
            } else {
                if (Number(vdate.split('-')[0]) > 0 && Number(vdate.split('-')[0]) < 32 && Number(vdate.split('-')[1]) > 0 && Number(vdate.split('-')[1]) < 13 && Number(vdate.split('-')[2]) > 1900) {
                    await fetch(`${global.urlAPI}account/signup`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${resAPI.accessToken}`
                        },
                        body: JSON.stringify({
                            // username, passowrd, first_name, last_name, phone_number, day_of_birth, address, gender, mail
                            'username': username,
                            'password': password,
                            'first_name': firstName,
                            'last_name': lastName,
                            'phone_number': phonenumber,
                            'day_of_birth': `${vdate.split('-')[2]}-${vdate.split('-')[1]}-${vdate.split('-')[0]}`,
                            'address': address,
                            'gender': gender,
                            'mail': email
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
                    setErrBirthDay(true);
                    setMessBirthDay('Vui l??ng nh???p ????ng ?????nh d???ng dd-mm-yyyy')
                }
            }

        } else {
            
            if (!lastName) {
                setIsErr(true);
                setErrLastname(true);
                setMessLastname(emptyErr)
            }
            if (!firstName) {
                setIsErr(true);
                setErrFirstname(true);
                setMessFirstname(emptyErr)
            }
            if (!phonenumber) {
                setIsErr(true);
                setErrPhonenumber(true);
                setMessPhonenumber(emptyErr)
            }
            if (!vdate) {
                setIsErr(true);
                setErrBirthDay(true);
                setMessBirthDay(emptyErr)
            }
            if (!address) {
                setIsErr(true);
                setErrAddress(true);
                setMessAddress(emptyErr)
            }
            if (!email) {
                setIsErr(true);
                setErrEmail(true);
                setMessEmail(emptyErr)
            }
            if (!username) {
                setIsErr(true);
                setErrUsername(true);
                setMessUsername(emptyErr)
            }
            if (!password) {
                setIsErr(true);
                setErrPassword(true);
                setMessPassword(emptyErr)
            }
            if (!repassword) {
                setIsErr(true);
                setErrRepassword(true);
                setMessRepassword(emptyErr)
            }
        }
        setIsLoad(false);
    }

    return (
        <View>
            {isLoad ? (<ActivityIndicator size="large" color='red' />) : null}

            <ScrollView style={styles.scroll} >
                <Text style={styles.text}>H???</Text>
                {errLastname ? (
                    <Text style={styles.textErr}>
                        *{messLastname}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Nguy???n V??n"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />

                <Text style={styles.text}>T??n</Text>
                {errFirstname ? (
                    <Text style={styles.textErr}>
                        *{messFirstname}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="A"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />

                <Text style={styles.text} >S??? ??i???n tho???i</Text>
                {errPhonenumber ? (
                    <Text style={styles.textErr}>
                        *{messPhonenumber}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    keyboardType='numeric'
                    placeholder="0123456789"
                    value={phonenumber}
                    onChangeText={text => setPhonenumber(text)}
                    maxLength={10}
                />

                <Text style={styles.text} >Ng??y th??ng n??m sinh</Text>
                {errBirthDay ? (
                    <Text style={styles.textErr}>
                        *{messBirthDay}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    keyboardType='numeric'
                    placeholder="01-01-1990"
                    value={vdate}
                    onChangeText={text => setVdate(text)}
                    maxLength={10}
                />
                <Text style={styles.text}>?????a ch???</Text>
                {errAddress ? (
                    <Text style={styles.textErr}>
                        *{messAddress}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="97 Man Thi???n, ph?????ng Hi???p Ph??, Qu???n Th??? ?????c, th??nh ph??? H??? Ch?? Minh"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <Text style={styles.text} >Gi???i t??nh</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <RadioButton
                            color='black'
                            status={gender == 1 ? 'checked' : 'unchecked'}
                            onPress={() => setGender(1)}
                        />
                        <Text style={styles.radioText} >Nam</Text>
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <RadioButton
                            color='black'
                            status={gender == 0 ? 'checked' : 'unchecked'}
                            onPress={() => setGender(0)}
                        />
                        <Text style={styles.radioText} >N???</Text>
                    </View>

                </View>

                <Text style={styles.text}>?????a ch??? email</Text>
                {errEmail ? (
                    <Text style={styles.textErr}>
                        *{messEmail}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="abc@gmail.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={styles.text}>T??n ????ng nh???p</Text>
                {errUsername ? (
                    <Text style={styles.textErr}>
                        *{messUsername}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />

                <Text style={styles.text} >M???t kh???u</Text>
                {errPassword ? (
                    <Text style={styles.textErr}>
                        *{messPassword}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="M???t kh???u c?? ??t nh???t 6 k?? t???"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Text style={styles.text} >Nh???p l???i m???t kh???u</Text>
                {errRepassword ? (
                    <Text style={styles.textErr}>
                        *{messRepassword}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="M???t kh???u c?? ??t nh???t 6 k?? t???"
                    value={repassword}
                    onChangeText={text => setRepassword(text)}
                    secureTextEntry
                />

                {isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > Vui l??ng ??i???n th??ng tin l???i </Text></View>) : null}

                <View style={styles.regButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignup}>
                        <Text style={styles.buttonText}>T???o t??i kho???n</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 50 }} />
            </ScrollView>
        </View>
    )
}