import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Text, Keyboard, Image, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styles from './style'
import MapDestination from './MapDestination'
import global from '../../global'
import { updateDestination, updateXDestination, updateYDestination, setDestination } from '../../Redux/locationSlices'
// import { setDestination } from '../../Redux/locationSlices'
import { useDispatch, useSelector } from 'react-redux';
import { updateDistance } from '../../Redux/locationSlices';
// import { locationSelector } from '../../Redux/locationSlices'

const Destination = ({ navigation }) => {
  const xDepartSite = useSelector((state) => state.location.xDepartSite);
  const yDepartSite = useSelector((state) => state.location.yDepartSite);
  const xDestination = useSelector((state) => state.location.xDestination);
  const yDestination = useSelector((state) => state.location.yDestination);
  const distance = useSelector((state) => state.location.distance);
  const [motorFee, setMotorFee] = useState(0);
  const [motorPrice, setMotorPrice] = useState(0);
  const [carFee, setCarFee] = useState(0);
  const [carPrice, setCarPrice] = useState(0);
  const [openKeyboard, setOpenKeyboard] = useState(false)
  const dispatch = useDispatch();

  const chooseLocation = async (data, details) => {
    dispatch(updateDestination(data.description))
    dispatch(updateXDestination(details.geometry.location.lat))
    dispatch(updateYDestination(details.geometry.location.lng))

    await fetch(`${global.urlAPI}transport/price`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${resAPI.accessToken}`
      },
      // body: JSON.stringify({

      // })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 215){
          setCarFee(responseJson.car);
          setMotorFee(responseJson.motor);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const bookmotor = () => {
    navigation.push('payment', {total: motorFee * distance})
  }

  const bookmcar = () => {
    navigation.push('payment', {total: carFee * distance})
  }

  useEffect(() => {
    if (xDepartSite && yDepartSite && xDestination && yDestination) {
      var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + xDepartSite + ',' + yDepartSite + '&destinations=' + xDestination + '%2C' + yDestination + '&key=' + global.keyMap;
      fetch(urlToFetchDistance)
        .then(res => {
          return res.json()
        })
        .then(res => {
          var distanceString = res.rows[0].elements[0].distance.text;
          const array = distanceString.split(' ');
          dispatch(updateDistance(Number(array[0])))
        })
        .catch(error => {
          console.log("Problem occurred");
        });
    }

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setOpenKeyboard(true)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setOpenKeyboard(false)
    })
  })

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapDestination />
      </View>

      <View style={styles.findSection}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Chọn điểm đến</Text>
        </View>

        <GooglePlacesAutocomplete
          nearbyPlacesAPI='GooglePlacesSearch'
          placeholder='Chọn nơi cần đến'
          debounce={400}
          enableHighAccuracyLocation={true}
          filterReverseGeocodingByTypes={['street_address', 'geocode', 'locality']}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
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

        {(xDepartSite && yDepartSite && xDestination && yDestination && !openKeyboard) ? (
          <View style={styles.goSection}>
            <TouchableOpacity style={styles.motorSection} onPress={bookmotor} >
              <View >
                <Image
                  source={require('../../assets/motor.png')}
                  style={styles.motorImage}
                />
                <Text style={styles.motorDistanceText}>{distance} km</Text>
                <Text style={styles.motorPriceText}>{motorFee * distance}đ</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.carSection} onPress={bookmcar} >
              <View >
                <Image
                  source={require('../../assets/car.png')}
                  style={styles.carImage}
                />
                <Text style={styles.carDistanceText}>{distance} km</Text>
                <Text style={styles.carPriceText}>{carFee * distance}đ</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

      </View>


    </View>



  )
}

export default Destination
