import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';


const Drawer = createDrawerNavigator();


export default function DrawerButton() {

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Toggle drawer"
          onPress={() => props.navigation.toggleDrawer()}
        />
      </DrawerContentScrollView>
    )};

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Home" component={ChatScreen} />
        </Drawer.Navigator>
    );
  }