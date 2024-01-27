import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error removing token', error);
    }
  };
  return (
    <View style={{padding: 10}}>
      <Text style={{textAlign: 'center', marginTop: 20, fontSize: 24}}>
        Odaberite kolegij
      </Text>
      <Pressable onPress={() => navigation.navigate('Details')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 40,
            backgroundColor: '#6699CC',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{flex: 1, color: '#fff', fontSize: 16}}>
            Ugradbeni Računalni sustavi
          </Text>
          <Icon name="book-outline" size={25} color="white" />
        </View>
      </Pressable>
      <Pressable
        onPress={removeToken}
        style={{
          width: 200,
          backgroundColor: '#6699CC',
          padding: 15,
          borderRadius: 6,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 350,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Log Out
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;
