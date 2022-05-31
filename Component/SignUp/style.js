import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
import global from "../../global";

export default StyleSheet.create({
    scroll: {
        height: height,
        paddingTop:20
    },
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.lightColor,
        top: 20,
        width: width /2
    },
    buttonText: {
        fontFamily: 'sans-serif-medium',
        color: '#fff',
        fontWeight: '400'
    },
    forgot: {
        fontStyle: 'italic',
        textAlign: 'right',
        color: '#1f51b8',
        right: 5,
        textDecorationLine: 'underline',
    },
    text: {
        fontFamily: 'sans-serif-medium',
        color: global.mainColor,
        fontWeight: '400',
        fontSize: 20,
        padding: 10,
        // top: 5,
        paddingTop: 5
    },
    radioText: {
        fontFamily: 'sans-serif-medium',
        color: global.mainColor,
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mess: {
        color: 'red',
        padding: 10,
    },
    messContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    regButton:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width,
        height: height * 0.5
    },
    textErr:{
        color: 'red',
        fontSize: 15,
        paddingBottom: 5,
        paddingLeft: 20
    }

});