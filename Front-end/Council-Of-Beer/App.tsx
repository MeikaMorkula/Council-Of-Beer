import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import Home from './screens/Home';
import NewPost from './screens/NewPost';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const Tabs = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={Home}
            options={{
              tabBarIcon: ({color, size}) => (
                <Ionicons name="beer-outline" size={24} color="black" />
              )
            }}
          />
          <Tabs.Screen name="New Post" component={NewPost}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" size={24} color="black"/>
              )
            }}  
          />
          <Tabs.Screen name="Profile" component={Profile}
            options={{
              tabBarIcon: ({color, size}) => (
                <Ionicons name="person-circle-outline" size={24} color="black" />
              )
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
