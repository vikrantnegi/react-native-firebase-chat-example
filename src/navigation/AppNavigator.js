import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import AuthLoadingScreen from '../components/AuthLoading';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

function AppNavigator({navigation}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setLoading(false);
      }
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
      <Stack.Navigator>
        {loading ? (
          <>
            <Stack.Screen
              options={{headerMode: 'screen', headerShown: false}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
