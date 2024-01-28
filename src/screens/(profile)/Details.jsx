import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import PieChart from 'react-native-pie-chart';

const Details = () => {
  const [attendances, setAttendances] = React.useState([]);

  const widthAndHeight = 250;
  const totalClasses = 12;
  const totalAttendances = attendances.length;

  const percentage = (totalAttendances / totalClasses) * 100;

  const nonAttendancePercentage = 100 - percentage;

  const sliceColor = ['#32de84', '#ACE1AF'];

  React.useEffect(() => {
    getAllAttendance();
  }, []);

  const getAllAttendance = async () => {
    try {
      const response = await axios.get('http://192.168.1.181:3001/user/posts');
      setAttendances(response.data.userAttendances);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView style={{padding: 10, flexGrow: 1}}>
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, marginTop: 20}}>
          Prisutnost Studenta
        </Text>
        <View style={{marginTop: 20}}>
          {attendances.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
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
        <View style={styles.container}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={[percentage, nonAttendancePercentage]}
            sliceColor={sliceColor}
            coverRadius={0.6}
            coverFill={null}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {attendances.length}/{totalClasses}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Details;
