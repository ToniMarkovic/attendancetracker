import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import nfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

const Test = () => {
  // const [start, setStart] = React.useState(null);
  // const [duration, setDuration] = React.useState(0);
  // const androidPromptRef = React.useRef();

  // React.useEffect(() => {
  //   let count = 5;
  //   nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
  //     count--;

  //     if (Platform.OS === 'android') {
  //       androidPromptRef.current.setHintText(`${count}...`);
  //     } else {
  //       nfcManager.setAlertMessageIOS(`${count}...`);
  //     }

  //     if (count <= 0) {
  //       nfcManager.unregisterTagEvent().catch(() => 0);
  //       setDuration(new Date().getTime() - start.getTime());

  //       if (Platform.OS === 'android') {
  //         androidPromptRef.current.setVisible(false);
  //       }
  //     }
  //   });

  //   return () => {
  //     nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   };
  // }, [start]);

  // async function scanTag() {
  //   await nfcManager.registerTagEvent();
  //   if (Platform.OS === 'android') {
  //     androidPromptRef.current.setVisible(true);
  //   }
  //   setStart(new Date());
  //   setDuration(0);
  // }
  return (
    <View>
      <Text>NFC Game</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // wrapper: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // btn: {
  //   margin: 15,
  //   padding: 15,
  //   borderRadius: 8,
  // },
});

export default Test;
