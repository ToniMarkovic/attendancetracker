import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {courses} from '../../constants';

const Profile = ({navigation, route}) => {
  const {user} = route.params;

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
        Pozdrav {user.username}
      </Text>
      <Text style={{textAlign: 'center', marginTop: 12, fontSize: 16}}>
        Odaberite kolegij
      </Text>
      {courses.map((course, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Pressable
            onPress={() => navigation.navigate('Details', {user: user})}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
                backgroundColor: '#6699CC',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{flex: 1, color: '#fff', fontSize: 16}}>
                {course.name}
              </Text>
              <Icon name="book-outline" size={25} color="white" />
            </View>
          </Pressable>
        </View>
      ))}
      <Pressable
        onPress={removeToken}
        style={{
          width: 200,
          backgroundColor: '#6699CC',
          padding: 15,
          borderRadius: 6,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 250,
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
