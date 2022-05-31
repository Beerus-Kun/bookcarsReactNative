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


    const emptyErr = 'Vui lòng không để trống';

    const errFromAPI = (res) => {
        // 201, 400, 401, 402, 403, 404, 405, 407, 408, 409, 411
        console.log(res)
        if (res.code == 400) {
            setIsErr(true);
        }
        if (res.code == 401) {
            setIsErr(true);
            setErrEmail(true);
            setMessEmail('Email này đã đã được đăng ký')
        }
        if (res.code == 402) {
            setIsErr(true);
            setErrEmail(true);
            setMessEmail('Vui lòng điền đúng email')
        }
        if (res.code == 403) {
            setIsErr(true);
            setErrPhonenumber(true);
            setMessPhonenumber('Số điện thoại này đã đã được đăng ký')
        }
        if (res.code == 404) {
            setIsErr(true);
            setErrPhonenumber(true);
            setMessPhonenumber('Số điện thoại không hợp lệ')
        }
        if (res.code == 405) {
            setIsErr(true);
            setErrUsername(true);
            setMessUsername('Tên đăng nhập này đã được sử dụng')
        }
        if (res.code == 407) {
            setIsErr(true);
            setErrBirthDay(true);
            setMessBirthDay('Bạn phải trên 18 tuổi')
        }
        if (res.code == 408) {
            setIsErr(true);
            setErrBirthDay(true);
            setMessBirthDay('Vui lòng nhập đúng định dạng dd-mm-yyyy')
        }
        if (res.code == 409) {
            setIsErr(true);
            setErrPassword(true);
            setErrRepassword(true);
            setMessPassword('Vui lòng nhập trên 6 ký tự')
            setMessRepassword('Vui lòng nhập trên 6 ký tự')
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
                "Thông báo",
                "Đăng ký thành công",
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
                    setMessBirthDay('Vui lòng nhập đúng định dạng dd-mm-yyyy')
                }

                if (password != repassword) {
                    setIsErr(true);
                    setErrRepassword(true);
                    setMessRepassword('Mật khẩu và mật khẩu nhập lại không khớp')
                    setErrPassword(true);
                    setMessPassword('Mật khẩu và mật khẩu nhập lại không khớp')
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
                    setMessBirthDay('Vui lòng nhập đúng định dạng dd-mm-yyyy')
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
                <Text style={styles.text}>Họ</Text>
                {errLastname ? (
                    <Text style={styles.textErr}>
                        *{messLastname}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Nguyễn Văn"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />

                <Text style={styles.text}>Tên</Text>
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

                <Text style={styles.text} >Số điện thoại</Text>
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

                <Text style={styles.text} >Ngày tháng năm sinh</Text>
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
                <Text style={styles.text}>Địa chỉ</Text>
                {errAddress ? (
                    <Text style={styles.textErr}>
                        *{messAddress}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="97 Man Thiện, phường Hiệp Phú, Quận Thủ Đức, thành phố Hồ Chí Minh"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <Text style={styles.text} >Giới tính</Text>
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
                        <Text style={styles.radioText} >Nữ</Text>
                    </View>

                </View>

                <Text style={styles.text}>Địa chỉ email</Text>
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

                <Text style={styles.text}>Tên đăng nhập</Text>
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

                <Text style={styles.text} >Mật khẩu</Text>
                {errPassword ? (
                    <Text style={styles.textErr}>
                        *{messPassword}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Text style={styles.text} >Nhập lại mật khẩu</Text>
                {errRepassword ? (
                    <Text style={styles.textErr}>
                        *{messRepassword}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={repassword}
                    onChangeText={text => setRepassword(text)}
                    secureTextEntry
                />

                {isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > Vui lòng điền thông tin lại </Text></View>) : null}

                <View style={styles.regButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignup}>
                        <Text style={styles.buttonText}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 50 }} />
            </ScrollView>
        </View>
    )
}