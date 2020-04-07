import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import FullLoading from '../components/Loader';

export default function Signup({navigation}) {
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

  const register = async () => {
    if (!email || !password) {
      const error = getErrorMessage();
      showMessage({
        message: error,
      });
      return;
    }

    setLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);

      return navigation.navigate('Chat');
    } catch (error) {
      // stop loader if error occurs
      setLoading(false);

      // show error
      showMessage({
        message: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={[styles.email, styles.class]}>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={e => setEmail(e)}
            value={email}
          />
        </View>
        <View style={[styles.class, styles.password]}>
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={e => setPassword(e)}
            value={password}
          />
        </View>
        <View style={[styles.btnText, styles.class]}>
          <Button mode="contained" onPress={register} style={styles.btn}>
            Sign Up
          </Button>
        </View>
      </View>

      {loading && <FullLoading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomemsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  class: {
    marginBottom: 20,
    alignItems: 'center',
  },
  form: {
    flex: 2,
    justifyContent: 'center',
  },
  password: {
    marginBottom: 40,
  },
  textInput: {
    width: responsiveWidth(80),
  },
  btnText: {
    alignItems: 'center',
  },
  btn: {
    width: responsiveWidth(50),
  },
});
