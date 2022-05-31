import React from 'react';
import { TouchableWithoutFeedback, Keyboard, Image, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CustomerBookingItem = ({
  id,
  customerName,
  end_point,
  start_point,
  enterBooking,
}) => {
  console.log('point');
  console.log(customerName);
  return (
    <ListItem key={id} bottomDivider onPress={() => enterBooking(id)}>
      <Avatar
        rounded
        source={{
          uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {customerName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Location: from {start_point} to {end_point}, State: 
          <Text style={{color:'green'}}>wait</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomerBookingItem;
