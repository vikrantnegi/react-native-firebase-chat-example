import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthLoadingScreen from '../components/AuthLoading';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Button mode="text" onPress={() => auth().signOut()}>
        Logout
      </Button>
    </DrawerContentScrollView>
  );
}

// Main stack navigator after login.
function Main() {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color="#666" />
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator({navigation}) {
  const [loading, setLoading] = useState(true);
  const [userToken, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  if (loading) {
    // We haven't finished checking for the token yet
    return <AuthLoadingScreen />;
  }
  return (
    <NavigationContainer>
      {userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerMode: 'screen', headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Main" component={Main} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
