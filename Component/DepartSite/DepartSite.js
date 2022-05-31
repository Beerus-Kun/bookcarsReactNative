import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View, Image, TouchableOpacity, Text } from 'react-native'
// import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Entypo'
import global from '../../global'
import styles from './style';
import { updateDepartSite, updateXDepartSite, updateYDepartSite } from '../../Redux/locationSlices'

import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';


// navigator.geolocation = require('react-native-geolocation-service');

//  https://support.google.com/payments/contact/verify 29864118

const DepartSite = ({ navigation }) => {
  const dispatch = useDispatch()
  // const [hasLocation, setHasLocation] = useState(false);

  // const onPress = () => {
  //   navigation.push('destination')
  // }

  const chooseLocation = (data, details) => {
    dispatch(updateDepartSite(data.description))
    dispatch(updateXDepartSite(details.geometry.location.lat))
    dispatch(updateYDepartSite(details.geometry.location.lng))
    navigation.push('destination')
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/hinh1.jpg')}
      />
      <View style={styles.searchSection}>
        <Icon
          name='location'
          size={25}
          color={global.mainColor}
          style={styles.searchIcon}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI='GooglePlacesSearch'
          placeholder='Nơi bạn cần đón'
          debounce={400}
          enableHighAccuracyLocation={true}
          filterReverseGeocodingByTypes={['street_address', 'geocode', 'locality']}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            chooseLocation(data, details)
          }}
          onFail={(error) => console.log(error)}
          query={{
            key: global.keyMap,
            language: 'vi'
          }}
          styles={{
            textInput: styles.input
          }}
        />


      </View>
    </View>
  )
}

export default DepartSite
