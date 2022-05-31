import { StyleSheet, Dimensions } from "react-native";
import global from "../../global";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.8,
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
        // right: 0,
        fontSize: 15
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
        backgroundColor: '#b40000',
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
    },
    chatSection: {
        width: width,
        height: height *0.125,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    chatText: {
        fontSize: 20,
        color: '#fff'
    },
    chatButton:{
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 20
    },
})