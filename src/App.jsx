import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import nfcManager from 'react-native-nfc-manager';
import Game from './components/Game';
import Login from './screens/(auth)/Login';
import Register from './screens/(auth)/Register';
import Profile from './screens/(profile)/Profile';
import Details from './screens/(profile)/Details';
import AndroidPrompt from './components/AndroidPrompt';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = props => {
  const [hasNfc, setHasNfc] = React.useState(false);
  const [enabled, setEnabled] = React.useState(null);
  const propmtRef = React.useRef();

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await nfcManager.isSupported();
      if (supported) {
        await nfcManager.start();
        setEnabled(await nfcManager.isEnabled());
      }
      setHasNfc(supported);
    }

    checkNfc();
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>Your device doesn't support NFC</Text>
        <TouchableOpacity
          onPress={() => {
            propmtRef.current.setVisible(true);
          }}>
          <Text>Test</Text>
        </TouchableOpacity>
        <AndroidPrompt ref={propmtRef} />
      </View>
    );
  } else if (!enabled) {
    return (
      <View style={styles.wrapper}>
        <Text>Your NFC is not enabled</Text>

        <TouchableOpacity
          onPress={() => {
            nfcManager.goToNfcSetting();
          }}>
          <Text>GO TO SETTINGS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            setEnabled(await nfcManager.isEnabled());
          }}>
          <Text>CHECK AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Game}
          options={{title: 'Welcome'}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Register'}}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
