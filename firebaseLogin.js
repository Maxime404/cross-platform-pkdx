import React, { Component } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from "firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './signIn';
import SignUp from './signUp';
import User from './user';

const firebaseConfig = {
  apiKey: "AIzaSyDA4vg-KrM-nA_tFx5DCGVZVlCp-F6YbN4",
  authDomain: "cross-platform-pkdx.firebaseapp.com",
  databaseURL: "https://cross-platform-pkdx.firebaseio.com",
  projectId: "cross-platform-pkdx",
  storageBucket: "cross-platform-pkdx.appspot.com",
  messagingSenderId: "407208827338",
  appId: "1:407208827338:web:0a4afdef0fdc251e915733",
  measurementId: "G-SWSMLM4ZCP"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: {}
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#C20000' },
          }}
        >
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerTitle: "Sign In",
              headerLeft: () => (
                <Icon
                  name="menu"
                  size={20}
                  style={{ color: '#FFF', paddingHorizontal: 10 }}
                  onPress={() => this.props.navigation.openDrawer()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTitle: "Sign Up",
              headerLeft: () => (
                <Icon
                  name="menu"
                  size={20}
                  style={{ color: '#FFF', paddingHorizontal: 10 }}
                  onPress={() => this.props.navigation.openDrawer()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{
              headerTitle: "User",
              headerLeft: () => (
                <Icon
                  name="menu"
                  size={20}
                  style={{ color: '#FFF', paddingHorizontal: 10 }}
                  onPress={() => this.props.navigation.openDrawer()}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}