import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants';
import global from "../../global";

const { height, width } = Dimensions.get('window');
// 1024, 512
const rate = 1024 / width;

const radius = 13;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: '#ecf0f1',
  },
  backgroundImage: {
    width: 1024 / rate,
    height: 512 / rate,
    padding: 0,
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 0
  },
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: radius,
    paddingTop: -10,
    position: 'absolute',
    top: 512 / rate + Constants.statusBarHeight - 20,
    paddingLeft: 10,
    left: 10,
    // marginRight: 30
  },
  searchIcon: {
    padding: 10,
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    justifyContent: 'flex-start'
  },
  input: {
    paddingLeft: 0,
    height: 60,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
    borderRadius: radius
  },
  button:{
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: height * 3/ 4 ,
    width: width /2,
    left: width * 0.25,
    backgroundColor: global.midColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: global.whiteColor,
    fontSize: 18,
    fontWeight: 'bold'
  }
})