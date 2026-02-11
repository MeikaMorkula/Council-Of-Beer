import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import Home from './screens/Home';
import NewPost from './screens/NewPost';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Leaderboard from './screens/Leaderboard';
import Search from './screens/Search';

function FeedNav(){
  const HomeTabs = createMaterialTopTabNavigator();
  return(
    <HomeTabs.Navigator>
      <HomeTabs.Screen name="Home" component={Home}/>
      <HomeTabs.Screen name="Leaderboard" component={Leaderboard}/>
      <HomeTabs.Screen name="Search" component={Search}/>
    </HomeTabs.Navigator>
  );
}

export default function App() {

  const Tabs = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator initialRouteName="FeedNav">
          <Tabs.Screen name="FeedNav" component={FeedNav}
            options={{
              headerTitle: "Council of Beer",
              tabBarIcon: ({}) => (
                <Ionicons name="beer-outline" size={24} color="black" />
              ),
            }}
          />
          <Tabs.Screen name="New Post" component={NewPost}
            options={{
              headerTitle: "Council of Beer",
              tabBarIcon: ({}) => (
                <Ionicons name="add-circle-outline" size={24} color="black"/>
              )
            }}  
          />
          <Tabs.Screen name="Profile" component={Profile}
            options={{
              headerTitle: "Council of Beer",
              tabBarIcon: ({}) => (
                <Ionicons name="person-circle-outline" size={24} color="black" />
              )
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
