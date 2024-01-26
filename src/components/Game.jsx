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

const Game = ({navigation}) => {
  const [studentName, setStudentName] = React.useState('');
  const androidPromptRef = React.useRef();

  React.useEffect(() => {
    let count = 1;
    nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      count--;
      console.log('NFC TAG CONTNET', tag);

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
