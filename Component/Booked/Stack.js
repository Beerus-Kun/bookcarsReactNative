// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import { NavigationContainer } from '@react-navigation/native';
// import Booked from './Booked';
// import TripDetail from '../TripDetail/TripDetail';
// import { View } from 'react-native';

// const Stack = createStackNavigator();

// export default function ExtraStack() {
//     return (
//         // <NavigationContainer>
//         // 
//         // <View>

//             <Stack.Navigator initialRouteName='booked'>
//                 <Stack.Screen
//                     name='booked'
//                     component={Booked}
//                     options={{ headerShown: false }}
//                 />

//                 <Stack.Screen
//                     name='tripDetail'
//                     component={TripDetail}
//                     options={{ title: 'Chi tiết chuyến đi' }}
//                 />
//             </Stack.Navigator>
        
//         // </NavigationContainer>
//     )
// }