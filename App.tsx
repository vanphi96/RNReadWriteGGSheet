/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  NativeModules,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
// import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const apiKey = 'AIzaSyC2hR3eos5g1I1s7z1TusIPV611B5LbhPY';
const spreadsheetId = '1e3WtwcC7BUEQMO5ZSLeAcCJJRv6A_ZnnB05lYM1qE1s';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const {RNTwitterSignIn} = NativeModules;
  const [token, setToken] = useState('');

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices();
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
  }

  async function configureGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.configure({
        webClientId:
          '492097908129-j4ohijd6pm65r3e0pk7o6k4dn3v3jfpf.apps.googleusercontent.com', // Tìm trong credentials.json
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      // await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const accessToken = tokens.accessToken;
      console.log(accessToken);

      setToken(accessToken);
    } catch (error) {
      console.log('Google Sign-In configuration failed with error:', error);
    }
  }

  const readData = async () => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`,
      );
      // const response = await axios.get(
      //   `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/{Sheet1}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`
      // );

      const data = response.data;
      console.log('Data read from Google Sheets:', data.values);
    } catch (error) {
      console.error('Failed to read data from Google Sheets:', error);
      console.error('Error details:', error.response.data);
    }
  };

  const writeData = async () => {
    const range = 'Sheet1'; // specify the sheet name
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    console.log(token);

    const resource = {
      values: [
        ['Data1', 'Data2'],
        ['Data3', 'Data4'],
      ],
    };

    try {
      const response = await axios.put(
        apiUrl,
        {values: resource.values, majorDimension: 'ROWS'},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the access token in the Authorization header
          },
          params: {
            valueInputOption: 'RAW', // or 'USER_ENTERED', depending on your needs
          },
        },
      );

      console.log('Write to Google Sheets successful:', response.data);
    } catch (error) {
      console.error('Error writing to Google Sheets:', error);
      console.error('Error details:', error.response.data);
    }
  };

  const checkTokenInvalid = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );

      // Kiểm tra xem token còn hiệu lực hay không
      if (response.data.expires_in) {
        const expiresIn = response.data.expires_in;
        console.log(
          `AccessToken còn hiệu lực, thời gian còn lại: ${expiresIn} giây`,
        );
      } else {
        console.log('AccessToken đã hết hạn');
      }
    } catch (error) {
      // Xử lý lỗi
      console.error('Lỗi kiểm tra AccessToken:', error);
    }
  };

  useEffect(() => {}, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 100,
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
              marginVertical: 20,
            }}
            onPress={configureGoogleSignIn}>
            <Text style={{textAlign: 'center'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 100,
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
              marginVertical: 20,
            }}
            onPress={readData}>
            <Text style={{textAlign: 'center'}}>read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 100,
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
              marginVertical: 20,
            }}
            onPress={writeData}>
            <Text style={{textAlign: 'center'}}>write</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 100,
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
              marginVertical: 20,
            }}
            onPress={checkTokenInvalid}>
            <Text style={{textAlign: 'center'}}>check token invalid</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
