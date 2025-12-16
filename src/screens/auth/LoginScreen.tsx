import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Container from '../../components/common/Container';
import { signIn } from '../../lib/api';
import { setUser } from '../../store/slices/authSlice';
import LoginForm from '../../components/auth/LoginForm';
import HeartIcon from '../../assets/svg/HeartIcon';

export default function LoginScreen({ navigation }) {

  return (
    <Container scroll>
      <View>
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <HeartIcon />
        </View>
        <Text style={styles.title}>Murmur</Text>
      </View>
      <LoginForm />
    </Container>
  );
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
  },
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