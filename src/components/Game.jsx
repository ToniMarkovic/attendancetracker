import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import nfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';
import axios from 'axios';

const Game = ({navigation}) => {
  const [studentName, setStudentName] = React.useState('');
  const androidPromptRef = React.useRef();

  React.useEffect(() => {
    let count = 1;
    nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      count--;

      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        const firstRecord = tag.ndefMessage[0];

        const payloadAsString = firstRecord.payload
          .map(byte => String.fromCharCode(byte))
          .join('');

        // Discard the unwanted prefix
        const substringFromThirdLetter = payloadAsString.substring(3);
        setStudentName(substringFromThirdLetter);
      } else {
        console.log('NFC Tag does not contain Ndef data');
      }

      if (Platform.OS === 'android') {
        androidPromptRef.current.setHintText(`Skeniranje...`);
      } else {
        nfcManager.setAlertMessageIOS(`Skeniranje...`);
      }

      if (count <= 0) {
        nfcManager.unregisterTagEvent().catch(() => 0);

        if (Platform.OS === 'android') {
          androidPromptRef.current.setVisible(false);
        }
      }
    });

    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  async function scanTag() {
    await nfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
    }
  }

  React.useEffect(() => {
    const addAttendance = async () => {
      try {
        const attendanceData = {
          studentName: studentName,
        };
        axios
          .post('http://192.168.1.181:3001/attendance', attendanceData)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log('error', error);
          });

        setStudentName('');
      } catch (error) {
        console.log('error', error);
      }
    };

    addAttendance();
  }, [studentName]);

  return (
    <View style={styles.wrapper}>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Text>NFC Game</Text>
      <Text>{studentName}</Text>
      <TouchableOpacity style={styles.btn} onPress={scanTag}>
        <Text>START</Text>
      </TouchableOpacity>
      <AndroidPrompt
        ref={androidPromptRef}
        onCancelPress={() => {
          nfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#cc',
  },
});

export default Game;
