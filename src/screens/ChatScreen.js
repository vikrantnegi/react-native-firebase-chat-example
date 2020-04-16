import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

function ChatScreen() {
  const {currentUser} = auth();

  console.log(currentUser);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Chat Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatScreen;
