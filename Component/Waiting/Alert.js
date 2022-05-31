import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../ReceiveTrip/colors.jsx';

/// hiển thị thông tin driver đến cho client
const Alert = ({
  numberPlate,
  fullName,
  phoneNumber,
  id,
  start_point,
  end_point,
  total,
}) => {
  console.log(numberPlate);
  const [showWarning, setShowWarning] = useState(true);

  return (
    <View style={styles.body}>
      <Modal
        key={id}
        visible={showWarning}
        transparent
        onRequestClose={() => setShowWarning(false)}
        animationType="slide"
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
              }}
            >
              <View style={styles.imageContainer}>
                <Avatar
                  rounded
                  size={'xlarge'}
                  source={{
                    uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png',
                  }}
                />
                <Text style={styles.textCustomerName}>
                  <Icon name="info" size={24} color={'blue'} />
                  {fullName}
                </Text>
                <Text style={styles.textCustomerName}>
                  <Icon name="phone" size={30} color={'blue'} />
                  {phoneNumber}
                </Text>
                <Text style={styles.textCustomerName}>
                  Number plate: {numberPlate}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  <View style={styles.line} />
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
                  <View style={styles.priceTag}>
                    <Text
                      style={{
                        marginLeft: 15,
                        color: COLORS.white,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {total}$
                    </Text>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    About
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 16,
                      lineHeight: 22,
                      marginTop: 10,
                    }}
                  >
                    <Ionicons name="location" size={22} color={'red'} />
                    Go from: {start_point} to: {end_point}
                  </Text>
                </View>
              </View>
              <View style={styles.containerBtn}>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => setShowWarning(false)}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    addingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    margin: 6,
    minWidth: '46%',
    textAlign: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: '80%',
    height: '80%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderRadius: 20,
    margin: 5,
  },
  buttonYesNo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

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

export default Alert;
