import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const Details = () => {
  const [attendances, setAttendances] = React.useState([]);

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
    <View style={{padding: 10}}>
      <Text style={{textAlign: 'center', fontSize: 24, marginTop: 20}}>
        Prisutnost Studenta
      </Text>
      {attendances.map((item, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 40,
            backgroundColor: '#6699CC',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff', flex: 1}}>{item.studentName}</Text>
          <Text style={{color: '#fff', marginRight: 7}}>
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
          <Icon name="checkmark-done-outline" size={25} color="#32de84" />
        </View>
      ))}
    </View>
  );
};

export default Details;
