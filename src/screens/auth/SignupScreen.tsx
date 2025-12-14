import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeartIcon from '../../assets/svg/HeartIcon';
import SignupForm from '../../components/auth/SignupForm';
import Container from '../../components/common/Container';

export default function SignupScreen() {

  return (
      <Container scroll>
      <View>
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <HeartIcon />
        </View>
        <Text style={styles.title}>Murmur</Text>
      </View>
      <SignupForm />
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
})