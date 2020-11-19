
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Home from "./screens/Home";
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Home />
//     </View>
//   )
// }


const myOptions = {
  title: "My Employees",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"
  }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={Home}
          options={myOptions}
        />
        <Stack.Screen
          options={{ ...myOptions, title: "Create Employee" }}
          name="Create"
          component={CreateEmployee}
        />
        <Stack.Screen
          options={{ ...myOptions, title: "Profile" }}
          name="Profile"
          component={Profile}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
});