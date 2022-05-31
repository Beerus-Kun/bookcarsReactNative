import react, { Component, useState, useRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import { Avatar } from 'react-native-elements';
// import { log } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../Firebase';
import lgImage from './../../assets/60893.jpg';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  console.log(firebase.auth().currentUser.displayName);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.object._chatName,
      headerBackTitleVisible: false,
    });
  }, [navigation]);
  const sendMessage = () => {
    Keyboard.dismiss();
    firebase
      .firestore()
      .collection('chats')
      .doc(route.params.object._id)
      .collection('messages')
      .add({
        name: firebase.auth().currentUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        mail: firebase.auth().currentUser.email,
      });
    setInput('');
  };
  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .doc(route.params.object._id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  return (
    <ImageBackground
      source={lgImage}
      style={styles.backgroundContainer}
      resizeMode="stretch"
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
          {messages.map(({ id, data }) =>
            data.mail === firebase.auth().currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Avatar
                  rounded
                  size={30}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  source={{
                    uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png',
                  }}
                />
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            ) : (
              <View style={styles.sender}>
                <Avatar
                  rounded
                  size={30}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  source={{
                    uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png',
                  }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.name}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendMessage}
            placeholder="Signal Message"
            style={styles.textInput}
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Icon name="send" size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    marginRight: 15,
    flex: 1,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginBottom: 15,
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    color: 'white',
    paddingRight: 10,
    fontSize: 10,
  },
  rec: {},
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
});
export default ChatScreen;
