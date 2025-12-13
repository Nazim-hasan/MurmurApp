import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { signIn } from '../lib/api';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = await signIn(email, password);
      dispatch(setUser(user));
      navigation.navigate('Home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      <TextInput style={styles.container} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.container} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '95%',
    marginLeft: 10,
    borderColor: 'gray',

    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  }
})