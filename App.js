import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/homeScreen/HomeScreen';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import SearchResultScreen from './src/screens/SearchResultsScreen/SearchResultsScreen';
import ViewScreen from './src/screens/ViewScreen/ViewScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode={"none"}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultScreen} headerMode={"Search Results"} />
        <Stack.Screen name="View" component={ViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
