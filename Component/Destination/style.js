import { StyleSheet, Dimensions } from "react-native";
import global from "../../global";

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1
    },
    mapView: {
        flex: 1
    },
    findSection: {
        flex: 1
    },
    titleSection: {
        justifyContent: 'center',
        padding: 20,


        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: global.mainColor
    },
    goSection: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: width * 0.6,
    },
    motorSection: {
        width: width * 0.3,
        backgroundColor: '#fff',
        // borderWidth: 0.2,
        borderRadius: 20,
        height: width * 0.3,
        marginHorizontal: 20,
        shadowColor: global.lightColor,
        elevation: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    carSection: {
        width: width * 0.3,
        backgroundColor: '#fff',
        // borderWidth: 0.2,
        borderRadius: 20,
        // flex: 1
        height: width * 0.3,
        marginHorizontal: 20,
        elevation: 5,
        shadowColor: global.lightColor,
        justifyContent: 'center',
        alignItems:'center'
    },
    motorImage:{
        width: width * 0.15,
        height: width * 0.15
    },
    carImage:{
        width: width * 0.15,
        height: width * 0.15
    },
    motorDistanceText:{

    },
    carDistanceText:{

    },
    motorPriceText:{

    },
    carPriceText:{

    }
})