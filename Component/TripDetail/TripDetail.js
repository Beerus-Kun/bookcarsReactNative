import React, { useState } from 'react'
import { View, Text, ScrollView, Modal, StyleSheet, Pressable, Button, TouchableOpacity } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons'
import global from '../../global';
import MapTripDetail from './MapTripDetail';
import styles from './style';

export default function TripDetail({ route }) {
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(5)
    const [isRating, setIsRating] = useState(false);

    const ratingCompleted = (rating) => {
        setScore(rating)
        // setShowModal(!showModal)
    }

    const onShowModal = () => {
        setShowModal(true)
    }

    const pressButtonRating = () => {
        setIsRating(!isRating);
        setShowModal(!showModal);
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Đánh giá chuyến đi</Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                            defaultRating={score}
                            size={25}
                            onFinishRating={ratingCompleted}
                        // isDisabled={isRating}
                        />
                        <TouchableOpacity onPress={pressButtonRating}>
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>GỬI ĐÁNH GIÁ</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={styles.mainSection}>
                <View style={styles.codeSection}>
                    <Text style={styles.codeTextTitle}>
                        Mã chuyến đi:
                    </Text>
                    <Text style={styles.codeTextContent}>
                        #1 .
                    </Text>
                </View>
                <View style={styles.priceSection}>
                    <Text style={styles.priceTitle}>
                        Tổng đã trả:
                    </Text>
                    <View style={styles.priceContentSection}>
                        <Text style={styles.priceContentText1}>
                            113.000đ
                        </Text>
                        <Text style={styles.priceContentText2}>
                            Chuyển tiền
                        </Text>
                    </View>
                </View>

                <View style={styles.driverSection}>
                    <Text style={styles.driverTitleText}>
                        Tài xế:
                    </Text>
                    <Text style={styles.driverContentText}>
                        Beerus Sama
                    </Text>
                </View>

                <View style={styles.distanceSection}>
                    <Text style={styles.distanceTitleText}>
                        Độ dài:
                    </Text>
                    <Text style={styles.distanceContentText}>
                        1.5 km
                    </Text>
                </View>



                <View style={styles.departSiteSection}>
                    <Icon
                        name='adjust'
                        color='blue'
                        size={25}
                        style={styles.departSiteIcon}
                    />

                    <Text style={styles.departSiteText}>
                        Học viện bưu chính viễn thông
                    </Text>
                </View>

                <View style={styles.destinationSection}>
                    <Icon
                        name='add-location-alt'
                        color='red'
                        size={25}
                        style={styles.destinationIcon}
                    />
                    <Text style={styles.destinationText}>
                        Ngã tư thủ đức
                    </Text>
                </View>

                {isRating ? (
                    <View style={styles.rattingSection}>
                        <AirbnbRating
                            count={5}
                            showRating={false}
                            defaultRating={score}
                            size={25}
                            isDisabled={true}
                        />
                    </View>
                ) : (
                    <TouchableOpacity onPress={onShowModal}>
                        <View style={styles.rattingSection} >
                            <Text style={styles.ratingText}>
                                Nhấn để đánh giá chuyến đi
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.mapSection}>
                <MapTripDetail
                    // 10.847411894664464, 106.78688001528529
                    xDepartSite={10.8486375}
                    yDepartSite={106.7856918}
                    xDestination={10.847411894664464}
                    yDestination={106.78688001528529}
                    departSite='Học viện bưu chính viễn thông'
                />
            </View>

        </View >
    )
}
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2
//     },
//     buttonOpen: {
//         backgroundColor: "#F194FF",
//     },
//     buttonClose: {
//         backgroundColor: "#2196F3",
//     },
//     textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center"
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center"
//     }
// });