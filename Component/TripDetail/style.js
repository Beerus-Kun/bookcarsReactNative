import { StyleSheet, Dimensions } from "react-native";
import global from "../../global";

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        // marginBottom: 0,
        textAlign: "center",
        fontSize: 20,
        fontWeight: '800',
        color: global.mainColor
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#01a14b',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15
    },
    modalButtonText: {
        color: '#fff',
    },
    mainSection: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 10
    },
    codeSection: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
    },
    codeTextTitle: {
        fontSize: 15,
        fontWeight: '800',

    },
    codeTextContent: {
        fontStyle: 'italic'
    },
    priceTitle: {
        fontFamily: 'serif',
        fontSize: 15,
        fontWeight: 'bold',
        color: global.mainColor
    },
    priceSection: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    priceContentSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceContentText1: {
        fontWeight: '900'
    },
    priceContentText2: {
        color: 'blue'
    },
    driverSection: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    driverTitleText: {
        fontFamily: 'serif',
        fontSize: 15,
        fontWeight: 'bold',
        color: global.mainColor
    },
    driverContentText: {
        fontWeight: '900'
    },
    distanceSection: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    distanceTitleText: {
        fontFamily: 'serif',
        fontSize: 15,
        fontWeight: 'bold',
        color: global.mainColor
    },
    distanceContentText: {
        fontWeight: '900'
    },
    departSiteSection: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 15
    },
    departSiteIcon: {
        paddingRight: 10
    },
    departSiteText: {
        fontWeight: '900'
    },
    destinationSection: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 5
    },
    destinationIcon: {
        paddingRight: 10
    },
    destinationText: {
        fontWeight: '900'
    },
    rattingSection: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    ratingText: {
        fontStyle: 'italic',
        color: 'blue',
        textDecorationLine: 'underline',
        fontWeight: '900'
    },
    mapSection: {
        height: height/2,
        width: width - 40,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20
    }
});