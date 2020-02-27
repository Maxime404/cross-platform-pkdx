import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import List from './list';
import Pokemon from './pokemon';

const Stack = createStackNavigator();

export default class MyApp extends Component {
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
            name="List"
            component={List}
            options={{
              headerTitle: "Pokedex",
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
            name="Pokemon"
            component={Pokemon}
            options={{ title: 'Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}