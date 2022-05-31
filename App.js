import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Button, useWindowDimensions } from 'react-native';
import Index from './Component/Index';
import Booked from './Component/Booked/Booked';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import TripDetail from './Component/TripDetail/TripDetail';
import Destination from './Component/Destination/Destination';
import Payment from './Component/Payment/Payment';
import SignUp from './Component/SignUp/SignUp';
import Waiting from './Component/Waiting/Waiting'
import DriverRegistration from './Component/DriverRegistration/DriverRegistration'
import InfoDetailBooking from './Component/ReceiveTrip/InforDetailBooking'
import ChatScreen from './Component/Waiting/ChatScreen';


const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='root'
            component={Index}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='forgotPassword'
            component={ForgotPassword}
            options={{ title: 'Quên mật khẩu' }}
          />

          <Stack.Screen
            name='booked'
            component={Booked}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='tripDetail'
            component={TripDetail}
            options={{ title: 'Chi tiết chuyến đi' }}
          />

          <Stack.Screen
            name='destination'
            component={Destination}
            options={{ title: 'Điểm đến' }}
          />

          <Stack.Screen
            name='payment'
            component={Payment}
            options={{ title: 'Thanh toán' }}
          />

          <Stack.Screen
            name='signup'
            component={SignUp}
            options={{ title: 'Đăng ký' }}
          />

          <Stack.Screen
            name='waiting'
            component={Waiting}
            options={{ title: '    ' }}
          />

          <Stack.Screen
            name='toDriver'
            component={DriverRegistration}
            options={{ title: 'Đăng ký thành tài xế' }}
          />

          <Stack.Screen
            name="toInfoDetailBooking"
            component={InfoDetailBooking}
            options={{ title: 'Chi tiết chuyến xe' }}
          />

          <Stack.Screen
            name="chatScreen"
            component={ChatScreen}
            options={{ title: 'Chi tiết chuyến xe' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}
