import { StyleSheet, Dimensions } from "react-native";
import global from "../../global";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        height: height,
        width: width
    },
    titleText: {
        color: global.mainColor,
        fontSize: 30
    },
    titleSection: {
        height: height /3,
        width: width,
        justifyContent: 'center',
        alignItems:'center'
    },
    contentSection: {
        // paddingHorizontal: 20,
        paddingVertical: 5,
        // marginHorizontal: 20,
        // marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentText1: {
        // width: width *0.5
        fontSize: 18,
        color: global.mainColor
    },
    contentText2: {
        // width: width *0.5,
        // right: 0
    },
    paymentSection: {
        width: width,
        height: height *0.125,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    paymentText: {
        fontSize: 20,
        color: '#fff'
    },
    paymentButton:{
        backgroundColor: global.midColor,
        padding: 20,
        borderRadius: 20
    },
    contentSection1:{
        width: width*0.5,
        paddingLeft: 20
    },
    contentSection2:{
        width: width*0.5,
        paddingRight: 20
    }
})