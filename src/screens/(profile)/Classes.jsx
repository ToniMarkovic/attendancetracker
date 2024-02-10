import {View, Text, Pressable, ScrollView} from 'react-native';
import {classes} from '../../constants';

const Classes = ({navigation, route}) => {
  const {user} = route.params;

  return (
    <ScrollView style={{padding: 10}}>
      <Text style={{textAlign: 'center', marginTop: 12, fontSize: 24}}>
        Odaberite predavanje
      </Text>
      {classes.map((cls, index) => (
        <View key={index}>
          <Pressable
            onPress={() => {
              const serializedCls = {
                ...cls,
                classStartDate: cls.classStartDate.toISOString(),
                classEndDate: cls.classEndDate.toISOString(),
              };

              navigation.navigate('Details', {user: user, cls: serializedCls});
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                backgroundColor: '#6699CC',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{flex: 1, color: '#fff', fontSize: 16}}>
                {cls.title}
              </Text>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

export default Classes;
