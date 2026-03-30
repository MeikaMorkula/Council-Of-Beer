import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import Home from './screens/Home';
import NewPost from './screens/NewPost';
import MainSettings from './screens/MainSettings';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Leaderboard from './screens/Leaderboard';
import Search from './screens/Search';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";
import SignUp from './screens/Signup'
import Login from './screens/Login'
import "./i8n.ts";



function FeedNav(){
  const HomeTabs = createMaterialTopTabNavigator();
  const { t } = useTranslation();
  return(
    <HomeTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#28200C' },
        tabBarLabelStyle: { color: '#EDE9C7' },
        tabBarIndicatorStyle: { backgroundColor: '#E39914' }
      }}
    >
      <HomeTabs.Screen name="Home" component={Home}  options={{ tabBarLabel: t("tabs.home") }}/>
      <HomeTabs.Screen name="Leaderboard" component={Leaderboard} options={{ tabBarLabel: t("tabs.leaderboard") }}/>
      <HomeTabs.Screen name="Search" component={Search} options={{ tabBarLabel: t("tabs.search") }}/>
      <HomeTabs.Screen name="Sign Up" component={SignUp} options={{ tabBarLabel: t("tabs.signup")}}/>
      <HomeTabs.Screen name="Log In" component={Login} options={{ tabBarLabel: t("tabs.login")}}/>
    </HomeTabs.Navigator>
  );
}

function MainHeader() {
  const navigation = useNavigation();
  return(
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>Council of Beer</Text>
      <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('LoginStack', {screen: 'LogIn'})}>
        <Ionicons name='log-in' size={32} color='#EDE9C7'/>
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
// Throws an error but works as expected 30.3.2026
function ProfileHeader() {
  const navigation = useNavigation();
  return(
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>Council of Beer</Text>
      <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('ProfileStack', {screen: 'MainSettings'})}>
        <Ionicons name='menu' size={32} color='#EDE9C7'/>
      </TouchableOpacity>
    </View>
  );
}

// This also throws an error but doesn't work??????
function ProfileStack(){
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='Profile'
        component={Profile}
      />
      <Stack.Screen
        name='MainSettings'
        component={MainSettings}
      />
    </Stack.Navigator>
  );
}

function LoginStack() {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='Feed'
        component={Home}
      />
      <Stack.Screen
        name='LogIn'
        component={Login}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  const Tabs = createBottomTabNavigator();
   const { t } = useTranslation();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator 
          initialRouteName="FeedStack"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;

              if(route.name === 'FeedStack'){
                iconName = focused
                  ? 'beer'
                  : 'beer-outline';
              } else if(route.name === 'New Post'){
                iconName = focused 
                  ? 'add-circle'
                  : 'add-circle-outline';
              } else if(route.name === 'ProfileStack'){
                iconName = focused  
                  ? 'person-circle'
                  : 'person-circle-outline';
              }
              // This error is fine, everything works as it should (14.3.2026)
              return <Ionicons name={iconName} size={24} color="#EDE9C7"/>
            },

            header: ({ route }) => {
              if(route.name === 'FeedStack'){
                return <MainHeader/>
              } else if (route.name === 'New Post'){
                return <PostHeader/>
              } else if(route.name === 'ProfileStack'){
                return <ProfileHeader/>
              }
            },

            tabBarStyle: {
              backgroundColor: '#28200C'
            },
            tabBarInactiveTintColor: '#EDE9C7',
            tabBarActiveTintColor: '#EFC06D'
          })}  
        >
          <Tabs.Screen name="FeedStack" component={LoginStack} options={{ tabBarLabel: t("footer.feed") }}
          />
          <Tabs.Screen name="New Post" component={NewPost} options={{ tabBarLabel: t("footer.newPost") }}
          />
          <Tabs.Screen name="ProfileStack" component={ProfileStack} options={{ tabBarLabel: t("footer.profile") }}
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
    backgroundColor: '#1D190E',
    color: '#EDE9C7',
    borderBottomWidth: 0.75,
    borderColor: '#EDE9C7'
  },
  headerText: {
    fontSize: 30,
    fontFamily: "GermaniaOne400_Regular",
    color: '#EDE9C7'
  },
  settingsBtn:{
    position: 'absolute',
    right: 15,
    top: 55,
    color: '#EDE9C7'
  }
});
