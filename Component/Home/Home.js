import React, { useState, useEffect } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import DepartSite from '../DepartSite/DepartSite';
// import DepartSite from '../Destination/Destination';
import Booked from '../Booked/Booked';
import Account from '../Account/Account';
import global from '../../global';
import styles from './style'
import ReceiveTrip from '../ReceiveTrip/ReceiveTrip';
import { useSelector } from 'react-redux';

const ButtonTab = createMaterialTopTabNavigator();



export default function Home() {
    const [isHideTab, setIsHideTab] = useState(false)

    const receiveTrip = useSelector((state) => state.driver.receiveTrip);

    // useEffect(() => {
    //     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
    //         setIsHideTab(true)
    //     });
    //     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    //         setIsHideTab(false)
    //     })
    // });
    return (

        <ButtonTab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: global.mainColor,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { textTransform: 'none' },
                tabBarStyle: { display: isHideTab ? 'none' : 'flex' }
            }}
            tabBarPosition='bottom'
        >


            {receiveTrip ? (
                <ButtonTab.Screen
                    name='home'
                    component={ReceiveTrip}

                    options={{
                        headerShown: false,
                        title: 'Nhận đơn',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabSection}>
                                <Icon
                                    name='car-side'
                                    size={focused ? 24 : 20}
                                    color={focused ? global.mainColor : global.unpickColor}
                                />
                            </View>
                        )
                    }}
                />
            ) :

                (
                    <ButtonTab.Screen
                        name='home'
                        component={DepartSite}
                        options={{
                            headerShown: false,
                            title: 'Đặt xe',
                            tabBarIcon: ({ focused }) => (
                                <View style={styles.tabSection}>
                                    <Icon
                                        name='car'
                                        size={focused ? 25 : 20}
                                        color={focused ? global.mainColor : global.unpickColor}
                                    />
                                </View>
                            )
                        }}
                    />
                )}

            <ButtonTab.Screen
                name='book'
                component={Booked}

                options={{
                    headerShown: false,
                    title: 'Đã đặt',
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabSection}>
                            <Icon
                                name='poll-h'
                                size={focused ? 25 : 20}
                                color={focused ? global.mainColor : global.unpickColor}
                            />
                        </View>
                    )
                }}
            />


            <ButtonTab.Screen
                name='account'
                component={Account}
                options={{
                    headerShown: false,
                    title: 'Thông tin',
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabSection}>
                            <Icon
                                name='user-alt'
                                size={focused ? 25 : 20}
                                color={focused ? global.mainColor : global.unpickColor}
                            />
                        </View>
                    )
                }}
            />
        </ButtonTab.Navigator>
    )
}