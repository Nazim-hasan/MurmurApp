import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PersonIcon from '../../assets/svg/PersonIcon';
import Container from '../../components/common/Container';
import { useAppSelector } from '../../hooks/hooks';
import { createMurmur } from '../../lib/murmurApi';
import { addMurmurToTop } from '../../store/slices/murmursSlice';
import { Theme } from '../../theme/Theme';

const CreateMurmurScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

    const user = useAppSelector(state => state.auth.user);
    console.log('user', user)

  const handlePost = async () => {
    if (!text.trim()) {
      Alert.alert('Validation', 'Murmur cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const murmur = await createMurmur(text.trim());
      dispatch(addMurmurToTop(murmur));
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <Text>Cancel</Text>
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.avatar}>
            <PersonIcon />
          </View>
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          multiline
          placeholder={`What's happening?`}
          style={{
            width: '88%',
            fontSize: 16,
            padding: 10,
            height: 300,
          }}
          value={text}
          onChangeText={setText}
          maxLength={280}
        />
      </View>
    </Container>
  );
};

export default CreateMurmurScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  postButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  postText: {
    color: Theme.colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 5,
    marginTop: 10,
  },
  avatar: {
    borderWidth: 1,
    borderColor: Theme.colors.gray600,
    padding: 5,
    borderRadius: 25,
    marginTop: 5,
  },
});
