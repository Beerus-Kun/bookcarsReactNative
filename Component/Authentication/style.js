import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#71dbae',
      padding: 20,
      justifyContent: 'space-between'
    },
    row1: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    },
    titleStyle: { 
      color: '#FFF', 
      fontFamily: 'Avenir', 
      fontSize: 30 
    },
    iconStyle: { 
      width: 30, 
      height: 30 
    },
    controlStyle: {
      flexDirection: 'row',
      alignSelf: 'stretch'
    },
    inactiveStyle: {
      color: '#D7D7D7'
    },
    activeStyle: {
      color: '#3EBA77'
    },
    signInStyle: {
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingVertical: 15,
      flex: 1,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
      marginRight: 1
    },
    signUpStyle: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      alignItems: 'center',
      flex: 1,
      marginLeft: 1,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20
    },
  });