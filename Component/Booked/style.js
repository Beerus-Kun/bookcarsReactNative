import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants';
import global from "../../global";

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    mainSection: {
        paddingTop: Constants.statusBarHeight + 5
    },
    titleSection: {
        height: height / 6,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'DancingScript',
        color: global.mainColor,
        
    },
    contentSection: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 0.2
    },
    placeSection: {
        width: width * 0.6,
        paddingHorizontal: 10
    },
    placeText:{
        fontSize: 17,
        fontWeight: '900'
    },
    timeText: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    paidText: {
        textAlign: 'right',
        fontWeight: '500'
    }
})