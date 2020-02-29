import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './signIn';
import SignUp from './signUp';
import User from './user';

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