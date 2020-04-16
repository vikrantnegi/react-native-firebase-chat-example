import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [users, setUsers] = useState([]);
  const {currentUser} = auth();

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);

      // update user "displayName" saved in the local
      getName().then(name => {
        currentUser.updateProfile({
          displayName: name,
        });
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        //save uid, name and email in the firebase database
        database()
          .ref(`/users/${user.uid}`)
          .set({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // create "users" ref database
    var unsubscribe = database().ref('users');

    unsubscribe.on('value', usersData => {
      const usersArray = [];

      usersData.forEach(user => {
        var userData = user.val();
        usersArray.push(userData);
      });

      setUsers(usersArray.filter(user => user.uid !== currentUser.uid)); // filter out current user before saving
    });

    return () => {
      // unsubscribe from database event
      unsubscribe && unsubscribe.off();
    };
  }, [currentUser.uid]);

  const renderItem = ({item}) => {
    return (
      <List.Item
        title={item.name}
        description={item.email}
        left={props => <List.Icon {...props} icon="account-circle" />}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatScreen;
