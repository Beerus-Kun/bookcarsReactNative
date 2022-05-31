import React, { useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import styles from './style'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import global from '../../global';
import { Avatar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const fetchFont = () => {
  return Font.loadAsync({
    'DancingScript': require('../../assets/fonts/DancingScript-SemiBold.ttf')
  })
}

const Booked = ({navigation}) => {
  const [fontLoad, setFontLoad] = useState(false)

  const press = () =>{
    navigation.navigate('tripDetail', {idBooked: 1})
  }

  if (!fontLoad) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log('err')}
        onFinish={() => {
          setFontLoad(true)
        }}
      />
    )
  }

  return (
    <View style={styles.mainSection}>
      <View style={styles.titleSection}>
        <Text style={{ fontFamily: 'DancingScript', fontSize: 36, color: global.mainColor }}>Lịch sử đơn hàng</Text>
      </View>
      <TouchableOpacity onPress={press}>
        <View style={styles.contentSection}>
          <Avatar.Image
            size={width / 7.5}
            source={require('../../assets/hinh3.png')}
            style={styles.avatar}
          />
          <View style={styles.placeSection}>
            <Text style={styles.placeText}>Nơi đến cực kỳ dài, dài ơi là dài dài như chưa bao h được dài</Text>
            <Text style={styles.timeText}>31/05/2022 22:30</Text>
          </View>
          <Text style={styles.paidText}>113.000đ</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.contentSection}>
          <Avatar.Image
            size={width / 7.5}
            source={require('../../assets/hinh3.png')}
            style={styles.avatar}
          />
          <View style={styles.placeSection}>
            <Text style={styles.placeText}>Nơi đến cực kỳ dài, dài ơi là dài dài như chưa bao h được dài</Text>
            <Text style={styles.timeText}>31/05/2022 22:30</Text>
          </View>
          <Text style={styles.paidText}>113.000đ</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.contentSection}>
          <Avatar.Image
            size={width / 7.5}
            source={require('../../assets/hinh3.png')}
            style={styles.avatar}
          />
          <View style={styles.placeSection}>
            <Text style={styles.placeText}>Nơi đến cực kỳ dài, dài ơi là dài dài như chưa bao h được dài</Text>
            <Text style={styles.timeText}>31/05/2022 22:30</Text>
          </View>
          <Text style={styles.paidText}>113.000đ</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default Booked
