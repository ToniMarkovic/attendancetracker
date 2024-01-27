import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {all} from 'axios';

const Profile = ({navigation}) => {
  const [attendances, setAttendances] = React.useState([]);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error removing token', error);
    }
  };

  React.useEffect(() => {
    getAllAttendance();
  }, []);
  const getAllAttendance = async () => {
    try {
      const response = await axios.get('http://192.168.1.181:3001/attendance');
      setAttendances(response.data.allAttendances);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View>
      <Text>User Profile</Text>
      {attendances.length > 0 ? (
        <View>
          <Text>Ima nesto</Text>
        </View>
      ) : (
        <View>
          <Text>Nema nista</Text>
        </View>
      )}
      <Pressable
        onPress={removeToken}
        style={{
          width: 200,
          backgroundColor: '#6699CC',
          padding: 15,
          borderRadius: 6,
          marginLeft: 'auto',
          marginRight: 'auto',
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
