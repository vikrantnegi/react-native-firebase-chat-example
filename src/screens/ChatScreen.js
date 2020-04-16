import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';

async function getName() {
  try {
    const name = await AsyncStorage.getItem('@name');
    if (name !== null) {
      return name;
    }
  } catch (e) {
    // error reading value
  }
}

function ChatScreen() {
  useEffect(() => {
    const {currentUser} = auth();

    getName().then(name => {
      currentUser.updateProfile({
        displayName: name,
      });
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        database()
          .ref(`/users/${user.uid}`)
          .set({
            name: user.displayName,
            email: user.email,
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Chat Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatScreen;
