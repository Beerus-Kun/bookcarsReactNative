import React from 'react';
import { TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CustomerItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Let chat with driver
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomerItem;
