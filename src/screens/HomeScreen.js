import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

function HomeScreen({navigation}) {
  const [name, onChangeName] = useState('');

  const onPress = () => {
    if (name) {
      navigation.navigate('Chat', {name: name});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}>
      <Text style={styles.title}>Enter your name:</Text>

      <TextInput
        placeHolder="John Doe"
        style={styles.inputStyle}
        onChangeText={text => onChangeName(text)}
        value={name}
      />
      <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
const offset = 24;

const styles = StyleSheet.create({
  inputStyle: {
    height: offset * 2,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    width: '100%',
    marginBottom: offset / 2,
  },
  title: {
    fontSize: offset,
    marginBottom: offset / 2,
  },
  buttonWrapper: {
    backgroundColor: '#5e72e4',
    paddingVertical: offset / 3,
    paddingHorizontal: offset / 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: offset,
    textAlign: 'center',
  },
});

export default HomeScreen;
