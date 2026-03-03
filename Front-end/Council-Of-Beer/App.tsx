import React from 'react';
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
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

function MainHeader() {
  return(
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>Council of Beer</Text>
      <TouchableOpacity style={styles.settingsBtn}>
        <Ionicons name='log-in' size={32} color='black'/>
      </TouchableOpacity>
    </View>
  );
}

function PostHeader() {
  return(
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>Council of Beer</Text>
    </View>
  );
}

function ProfileHeader() {
  return(
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>Council of Beer</Text>
      <TouchableOpacity style={styles.settingsBtn}>
        <Ionicons name='menu' size={32} color='black'/>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const Tabs = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator 
          initialRouteName="Feed"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;

              if(route.name === 'Feed'){
                iconName = focused
                  ? 'beer'
                  : 'beer-outline';
              } else if(route.name === 'New Post'){
                iconName = focused 
                  ? 'add-circle'
                  : 'add-circle-outline';
              } else if(route.name === 'Profile'){
                iconName = focused  
                  ? 'person-circle'
                  : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={24} color="black"/>
            },

            header: ({ route }) => {
              if(route.name === 'Feed'){
                return <MainHeader/>
              } else if (route.name === 'New Post'){
                return <PostHeader/>
              } else if(route.name === 'Profile'){
                return <ProfileHeader/>
              }
            }
          })}  
        >
          <Tabs.Screen name="Feed" component={FeedNav}
          />
          <Tabs.Screen name="New Post" component={NewPost}
          />
          <Tabs.Screen name="Profile" component={Profile}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  beerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    paddingTop: 50,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 30,
    fontFamily: "GermaniaOne400_Regular"
  },
  settingsBtn:{
    position: 'absolute',
    right: 15,
    top: 55
  }
});
