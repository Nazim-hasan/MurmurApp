import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { z } from 'zod';
import { Theme } from '../../theme/Theme';
import Button from '../common/Button';
import Input from '../common/Input';
import { useNavigation } from '@react-navigation/native';
import { signIn, signUp } from '../../lib/api';
import { setUser } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import MailIcon from '../../assets/svg/MailIcon';
import LockWithKeyIcon from '../../assets/svg/LockWithKeyIcon';
import EyeCloseIcon from '../../assets/svg/EyeCloseIcon';
import PersonIcon from '../../assets/svg/PersonIcon';

const SignupForm = () => {
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const schema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .nonempty('Password is required'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignUp = async (email, password, name) => {
    try {
      const user = await signUp(email, password, name);
      dispatch(setUser(user));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = handleSubmit(data => {
    handleSignUp(data.email, data.password, data.name);
  });

  const handleNavigateToSignup = () => {
    navigation.navigate('Login');
  };

  console.log('error', error);

  return (
    <KeyboardAvoidingView
      style={styles.logInContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <Input
          control={control}
          name="name"
          placeholderText="Name"
          leftIcon={(isFocused: boolean) => (
            <PersonIcon
              color={isFocused ? Theme.colors.primary : Theme.colors.gray800}
            />
          )}
        />

        <View style={{ height: 20 }} />
        <Input
          control={control}
          name="email"
          placeholderText="Email"
          leftIcon={(isFocused: boolean) => (
            <MailIcon
              color={isFocused ? Theme.colors.primary : Theme.colors.gray800}
            />
          )}
        />

        <View style={{ height: 20 }} />
        <Input
          control={control}
          name="password"
          placeholderText="Password"
          leftIcon={(isFocused: boolean) => (
            <LockWithKeyIcon
              color={isFocused ? Theme.colors.primary : Theme.colors.gray800}
            />
          )}
          rightIcon={(isFocused: boolean) => <EyeCloseIcon />}
          secureTextEntry
        />
      </View>
      <View style={{ height: 20 }} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={{ height: 20 }} />
      <Button
        title="Register"
        onPress={handleSignIn}
        style={styles.submitButton}
        textStyle={styles.textStyle}
      />
      <View style={{ height: 20 }} />
      <Text style={styles.forgotPasswordText}>
        Already have an account?{' '}
        <Text
          onPress={handleNavigateToSignup}
          style={{
            textDecorationLine: 'underline',
            fontWeight: '500',
          }}
        >
          Login
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  logInContainer: {
    flex: 1,
  },
  submitButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Theme.colors.primary,
  },
  forgotPasswordText: {
    color: Theme.colors.primary400,
    textAlign: 'center',
  },

  textStyle: {
    color: Theme.colors.white,
  },
  errorText: {
    color: Theme.colors.danger,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
