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
              <Text style={styles.textChange}>Thay đổi thông tin cá nhân   </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>Ưu đãi và tiết kiệm</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Ưu đãi</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Gói hội viên</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Thử thách</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Giới thiệu</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>Tổng quát</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Trung tâm trợ giúp</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Cài đặt</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Chia sẻ phản hồi</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>Cơ hội</Text>
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
            <Text style={styles.contentText}>Lái xe cùng Grab</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.topicSection}>
          <Text style={styles.topicText}>Tài khoản của tôi</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Đã đặt trước</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>
        {(!changeState && userRole) ? (
          <TouchableOpacity onPress={becomeDriver}>
            <View style={styles.contentSection}>
              <Text style={styles.contentText}>Đang ký trở thành tài xế</Text>
              <Icon
                name='right'
                style={styles.contentIcon}
              />
            </View>
          </TouchableOpacity>
        ) : null}
        {changeState ? (
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Nhận đơn hàng</Text>
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
            <Text style={styles.contentText}>Số liên hệ S.O.S</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Hồ sơ doanh nghiệp</Text>
            <Icon
              name='right'
              style={styles.contentIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogout}>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>Đăng xuất</Text>
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