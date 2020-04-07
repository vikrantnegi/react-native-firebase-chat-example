import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default function Signup({navigation}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={[styles.name, styles.class]}>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={e => setName(e)}
            value={name}
          />
        </View>
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
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={e => setPassword(e)}
            value={password}
          />
        </View>
        <View style={[styles.btnText, styles.class]}>
          <Button mode="contained" onPress={() => {}} style={styles.btn}>
            Sign Up
          </Button>
        </View>
      </View>
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
