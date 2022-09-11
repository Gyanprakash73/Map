import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {LOGIN} from '../../Api/Api';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const _loginApi = async () => {
    if (userName != null && password != null) {
      setSpinner(true);
      try {
        const response = await axios.post(LOGIN, {
          UserName: userName,
          Password: password,
        });
        if (response.data.Table2.length != 0) {
          setSpinner(false);
          ToastAndroid.show('Successful Login', ToastAndroid.SHORT);
          navigation.replace('HomeScreen', {Data: response.data.Table2});
        } else {
          setSpinner(false);
          ToastAndroid.show('Invalid Credentials!', ToastAndroid.SHORT);
        }
      } catch (error) {
        setSpinner(false);
        console.error(error);
        ToastAndroid.show('Invalid Credentials!', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(
        'Please Enter UserName and Password',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>User Login!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Enter UserName"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter Password"
        keyboardType="number-pad"
      />
      {spinner ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity
          style={styles.loginBtnView}
          activeOpacity={0.8}
          onPress={() => _loginApi()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 100,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  loginBtnView: {
    backgroundColor: '#F19545',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  loginText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoginScreen;
