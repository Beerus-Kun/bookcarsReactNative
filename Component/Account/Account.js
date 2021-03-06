import React, { useState } from 'react'
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Switch } from 'react-native'
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './style'
import global from '../../global';
import { useDispatch, useSelector } from 'react-redux';
import { updateReceiveTrip } from '../../Redux/driverSlices';
import { logout } from '../../Redux/informationSlices';
// import getDirections from 'react-native-google-maps-directions'

const { width } = Dimensions.get('window')

function Account({ navigation }) {
  // const [isReceive, setIsReceive] = useState(false);

  const dispatch = useDispatch();
  const receiveTrip = useSelector((state) => state.driver.receiveTrip);

  const toggleSwitch = () => {
    // setIsReceive(!isReceive)
    dispatch(updateReceiveTrip(!receiveTrip));
    navigation.navigate('root');
  }

  const becomeDriver = () =>{
    navigation.push('toDriver')
  }

  const name = useSelector((state) => state.information.lastName) + ' ' + useSelector((state) => state.information.firstName)

  const changeState = useSelector((state) => state.driver.changeState)
  const userRole = useSelector((state) => state.information.userRole)
  const onLogout = () => {
    dispatch(logout());
    navigation.navigate('root');
  }

  // const handleGetDirections = () => {
  //   const data = {
  //     source: {
  //       latitude: -33.8356372,
  //       longitude: 18.6947617
  //     },
  //     destination: {
  //       latitude: -33.8600024,
  //       longitude: 18.697459
  //     },
  //     params: [
  //       {
  //         key: "travelmode",
  //         value: "driving"        // may be "walking", "bicycling" or "transit" as well
  //       },
  //       {
  //         key: "dir_action",
  //         value: "navigate"       // this instantly initializes navigation using the given travel mode
  //       }
  //     ],
  //     waypoints: [
  //       {
  //         latitude: -33.8600025,
  //         longitude: 18.697452
  //       },
  //       {
  //         latitude: -33.8600026,
  //         longitude: 18.697453
  //       },
  //       {
  //         latitude: -33.8600036,
  //         longitude: 18.697493
  //       }
  //     ]
  //   }

  //   getDirections(data)
  // }

  console.log(userRole)

  return (
    <ScrollView style={styles.scrollSection}>
      <View style={styles.mainSection}>
        <View style={styles.userSection}>
          <Avatar.Image
            size={width / 4}
            source={require('../../assets/hinh2.jpg')}
            style={styles.avatar}
          />
          <View style={styles.profile}>
            <Text style={styles.textName}>{name}</Text>
            <TouchableOpacity>
              <Text style={styles.textChange}>Thay ?????i th??ng tin c?? nh??n   </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>??u ????i v?? ti???t ki???m</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>??u ????i</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>G??i h???i vi??n</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Th??? th??ch</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Gi???i thi???u</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>T???ng qu??t</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Trung t??m tr??? gi??p</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>C??i ?????t</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Chia s??? ph???n h???i</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>C?? h???i</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Support the Environment</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>L??i xe c??ng Grab</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>T??i kho???n c???a t??i</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>???? ?????t tr?????c</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        {(!changeState && userRole) ? (
          <TouchableOpacity onPress={becomeDriver}>
            <View style={styles.contentSection}>
              <Text style={styles.contentText}>??ang k?? tr??? th??nh t??i x???</Text>
              <Icon
                name='right'
                style={styles.contentIcon}
              />
            </View>
          </TouchableOpacity>
        ) : null}
        {changeState ? (
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Nh???n ????n h??ng</Text>
            <Switch
              trackColor={{ false: "#767577", true: global.lightColor }}
              thumbColor={receiveTrip ? global.midColor : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={receiveTrip}
            />
          </View>
        ) : null}
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Saved places</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>S??? li??n h??? S.O.S</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>H??? s?? doanh nghi???p</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogout}>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>????ng xu???t</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView >
  )
}

export default Account