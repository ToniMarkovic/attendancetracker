import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Register = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleRegister = () => {
    const user = {
      name: name,
      email: email.trim(),
      password: password.trim(),
    };
    console.log(user);

    axios
      .post('http://192.168.1.181:3001/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration succesfull',
          'You have been registered succesfully',
        );
        setName('');
        setEmail('');
        setPassword('');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert(
          'Registration failed',
          'An error ocurred during registration',
        );
        console.log(error.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#0066b2'}}>
          Registracija
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '600', marginTop: 20}}>
            Napravite svoj korisnički račun
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#E0E0E0',
            paddingVertical: 1,
            borderRadius: 5,
            marginTop: 30,
          }}>
          <Icon
            style={{marginLeft: 8}}
            name="person-outline"
            size={30}
            color="gray"
          />
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            style={{
              color: 'gray',
              marginVertical: 10,
              width: 290,
              fontSize: 20,
            }}
            placeholder="Unesite ime i prezime"
          />
        </View>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#E0E0E0',
              paddingVertical: 1,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Icon
              style={{marginLeft: 8}}
              name="mail-outline"
              size={30}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 290,
                fontSize: 20,
              }}
              placeholder="Unesite email"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#E0E0E0',
              paddingVertical: 1,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <Icon
              style={{marginLeft: 8}}
              name="lock-closed-outline"
              size={30}
              color="gray"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 290,
                fontSize: 20,
              }}
              placeholder="Unesite lozinku"
            />
          </View>

          <View style={{marginTop: 60}}>
            <Pressable
              onPress={handleRegister}
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
                Registracija
              </Text>
            </Pressable>

            <Pressable
              style={{marginTop: 15}}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{textAlign: 'center', fontSize: 15, color: 'gray'}}>
                Već imate korisnički račun? Prijavite se
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
