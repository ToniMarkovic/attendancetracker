import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import PieChart from 'react-native-pie-chart';
import {format} from 'date-fns';

const Details = ({navigation, route}) => {
  const [attendances, setAttendances] = React.useState([]);
  const [filteredAttendances, setFilteredAttendances] = React.useState([]);
  const [refreshFlag, setRefreshFlag] = React.useState(false);
  const {user, cls} = route.params;

  const widthAndHeight = 250;
  const totalClasses = user.professor ? 80 : 12;
  const totalAttendances = attendances.length;
  const totalFilteredAttendances = filteredAttendances.length;

  const percentage =
    ((user.professor ? totalFilteredAttendances : totalAttendances) /
      totalClasses) *
    100;

  const nonAttendancePercentage = 100 - percentage;

  let sliceColor = ['#32de84', '#ACE1AF'];

  if (totalAttendances < 9) {
    sliceColor = ['#ff0000', '#ffaaaa'];
  } else {
    sliceColor = ['#32de84', '#ACE1AF'];
  }

  const filterAttendancesByClassDateRange = (
    attendances,
    startDate,
    endDate,
  ) => {
    return attendances.filter(attendance => {
      const attendanceDateFormatted = format(
        new Date(attendance.createdAt),
        'yyyy-MM-dd',
      );
      const startDateFormatted = format(startDate, 'yyyy-MM-dd');
      const endDateFormatted = format(endDate, 'yyyy-MM-dd');

      return (
        attendanceDateFormatted >= startDateFormatted &&
        attendanceDateFormatted < endDateFormatted
      );
    });
  };

  React.useEffect(() => {
    getAllAttendance();
  }, [refreshFlag]);

  const getAllAttendance = async () => {
    try {
      const response = await axios.get(
        `${
          user.professor
            ? 'http://192.168.1.181:3001/attendance'
            : 'http://192.168.1.181:3001/user/posts'
        }`,
      );
      setAttendances(response.data.userAttendances);

      // Filter
      const startDate = cls?.classStartDate;
      const endDate = new Date(cls?.classEndDate);
      endDate.setDate(endDate.getDate() + 1);
      const filtered = filterAttendancesByClassDateRange(
        response.data.userAttendances,
        format(startDate, 'yyyy-MM-dd'),
        format(endDate, 'yyyy-MM-dd'),
      );
      setFilteredAttendances(filtered);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDelete = attendanceId => {
    Alert.alert(
      'Obriši evidenciju',
      'Jeste li sigurni da želite izbrisati evidenciju?',
      [
        {
          text: 'Odustani',
          style: 'cancel',
        },
        {
          text: 'Izbriši',
          onPress: () => {
            deletePost(attendanceId);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = async attendanceId => {
    try {
      const response = await axios.delete(
        `http://192.168.1.181:3001/attendance/${attendanceId}`,
      );

      if (response.status === 200) {
        console.log(`Attendance with ID ${attendanceId} deleted successfully`);
        console.log('Before setRefreshFlag:', refreshFlag);
        setRefreshFlag(prevFlag => !prevFlag);
        console.log('After setRefreshFlag:', !refreshFlag);
      } else {
        console.error(`Failed to delete attendance with ID ${attendanceId}`);
      }
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  return (
    <ScrollView style={{padding: 10, flexGrow: 1}}>
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, marginTop: 20}}>
          {user.professor ? `Evidencija - ${cls.title}` : 'Prisutnost studenta'}
        </Text>
        <View style={{marginTop: 20}}>
          {filteredAttendances.length === 0 && attendances.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {user.professor
                ? 'Nema evidentiranih dolazaka studenata'
                : 'Nemate evidentiranih dolazaka'}
            </Text>
          ) : user.professor ? (
            filteredAttendances.map((item, i) => (
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
                {user.professor && (
                  <Pressable
                    style={{marginLeft: 12}}
                    onPress={() => handleDelete(item._id)}>
                    <Icon name="trash-outline" size={22} color="red" />
                  </Pressable>
                )}
              </View>
            ))
          ) : (
            attendances.map((item, i) => (
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
                {user.professor && (
                  <Pressable
                    style={{marginLeft: 12}}
                    onPress={() => handleDelete(item._id)}>
                    <Icon name="trash-outline" size={22} color="red" />
                  </Pressable>
                )}
              </View>
            ))
          )}
        </View>
        {!user.professor && (
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
              }}>
              {user.professor ? '' : 'Obavezni ste doći na 9 / 12 rezervacija'}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 40,
                gap: 50,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 50,
                    overflow: 'hidden',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#ffaaaa',
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#ff0000',
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Nezadovoljeno
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 50,
                    overflow: 'hidden',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#ACE1AF',
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#32de84',
                    }}
                  />
                </View>
                <Text>Zadovoljeno</Text>
              </View>
            </View>
          </View>
        )}
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
              {user.professor ? filteredAttendances.length : attendances.length}
              /{totalClasses}
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
    marginTop: 50,
    marginBottom: 40,
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
