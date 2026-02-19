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
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from "react-i18next";
import "./i8n.ts";



function FeedNav(){
  const HomeTabs = createMaterialTopTabNavigator();
   const { t } = useTranslation();
  return(
    <HomeTabs.Navigator>
      <HomeTabs.Screen name="Home" component={Home}  options={{ tabBarLabel: t("tabs.home") }}/>
      <HomeTabs.Screen name="Leaderboard" component={Leaderboard} options={{ tabBarLabel: t("tabs.leaderboard") }}/>
      <HomeTabs.Screen name="Search" component={Search} options={{ tabBarLabel: t("tabs.search") }}/>
    </HomeTabs.Navigator>
  );
}

function BeerHeader() {
    const { t } = useTranslation();
  return(
    
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>{t("header.mainHeader")}</Text>
    </View>
  );
}

export default function App() {
  const Tabs = createBottomTabNavigator();
   const { t } = useTranslation();

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

            header: BeerHeader
          })}  
        >
          <Tabs.Screen name="Feed" component={FeedNav} options={{ tabBarLabel: t("footer.feed") }}
          />
          <Tabs.Screen name="New Post" component={NewPost} options={{ tabBarLabel: t("footer.newPost") }}
          />
          <Tabs.Screen name="Profile" component={Profile} options={{ tabBarLabel: t("footer.profile") }}
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
  }
});
