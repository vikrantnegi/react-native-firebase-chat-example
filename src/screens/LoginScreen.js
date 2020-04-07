import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, TextInput} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import FullLoading from '../components/Loader';

Icon.loadFont();

export default function LoginScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = () => {
    if (!email && !password) {
      return 'Fields are mandatory';
    }
    if (!email) {
      return 'Email is missing';
    }
    if (!password) {
      return 'Password is missing';
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      const error = getErrorMessage();
      showMessage({
        message: error,
      });
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoading(false);

      showMessage({
        message: error.message,
      });
    }
  };

  return (
    <View style={styles.scrollView}>
      <View style={styles.welcomemsg}>
        <Icon name="login" size={90} color="#6a0dad" />
      </View>
      <View style={styles.form}>
        <View style={styles.email}>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.textInput}
            onChangeText={e => setEmail(e)}
            autoCapitalize="none"
            value={email}
          />
        </View>
        <View style={styles.password}>
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.textInput}
            secureTextEntry
            onChangeText={pass => setPassword(pass)}
            autoCapitalize="none"
            value={password}
          />
        </View>
        <View style={styles.btnText}>
          <Button mode="contained" onPress={handleLogin} style={styles.btn}>
            <Text>Login</Text>
          </Button>
          <Text style={{marginTop: 10}}>
            New user?
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{color: '#6a0dad'}}>
              {' '}
              Signup
            </Text>
          </Text>
        </View>
      </View>
      {loading && <FullLoading />}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  welcomemsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 30,
  },
  form: {
    flex: 2,
    justifyContent: 'center',
  },
  email: {
    alignItems: 'center',
    marginBottom: 25,
  },
  password: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textInput: {
    width: responsiveWidth(80),
  },
  btnText: {
    alignItems: 'center',
    zIndex: 0,
  },
  btn: {
    width: responsiveWidth(50),
  },
});
