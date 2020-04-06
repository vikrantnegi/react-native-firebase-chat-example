import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, TextInput} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';

Icon.loadFont();

export default function LoginScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
          <Button mode="contained" onPress={() => {}} style={styles.btn}>
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
    </ScrollView>
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
  },
  btn: {
    width: responsiveWidth(50),
  },
});
