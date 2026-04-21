import React, { useEffect, useState } from 'react';
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
import ProductPage from './screens/Product'
import "./i8n";
import AddBeer from './screens/AddBeer';
import BarcodeScanner from "./components/BarcodeScanner";
import NewPostMenu from './screens/NewPostMenu'
import Collection from './screens/Collection';
import Post from './screens/Post';
import { getAuthState, isAuthenticated } from './utils/Auth';


const NewPostStack = createNativeStackNavigator();

//navigaatiot postauksia ja skannauksia varten
function NewPostStackScreen() {
  return (
    <NewPostStack.Navigator screenOptions={{ headerShown: false }}>
      <NewPostStack.Screen name="NewPostMenu" component={NewPostMenu}/>
      <NewPostStack.Screen name="AddBeer" component={AddBeer} />
      <NewPostStack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      <NewPostStack.Screen name="SearchBeer" component={Search} />
      
    </NewPostStack.Navigator>
  );
}

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
      <HomeTabs.Screen name="LoginStack" component={LoginStack}  options={{ tabBarLabel: t("tabs.home") }}/>
      <HomeTabs.Screen name="Leaderboard" component={LeaderboardStack} options={{ tabBarLabel: t("tabs.leaderboard") }}/>
      <HomeTabs.Screen name="Search" component={SearchStack} options={{ tabBarLabel: t("tabs.search") }}/>
    </HomeTabs.Navigator>
  );
}

// WORKS 30.3.2026
function MainHeader({ isLoggedIn }: {isLoggedIn: boolean }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (isLoggedIn) {
      navigation.navigate('ProfileStack', { screen: 'Profile' });
      return;
    }

    navigation.navigate('Feed', {
      screen: 'LoginStack',
      params: { screen: 'LogIn'},
    });
  };

  return(
    <View style={styles.beerHeader}>
      <Text style={styles.headerText}>Council of Beer</Text>
      <TouchableOpacity style={styles.settingsBtn} onPress={handlePress}>
        <Ionicons
          name={isLoggedIn ? 'person-circle' : 'log-in'}
          size={32}
          color='#EDE9C7'
        />
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
      <Stack.Screen
        name='Collection'
        component={Collection}
      />
      <Stack.Screen 
        name='Post'
        component={Post}
      />
      <Stack.Screen
        name='ProductPage'
        component={ProductPage}
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
        name='HomeFeed'
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
      <Stack.Screen
        name='Post'
        component={Post}
      />
    </Stack.Navigator>
  );
}

function LeaderboardStack() {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='LeaderboardScreen'
        component={Leaderboard}
      />
      <Stack.Screen
        name='ProductPage'
        component={ProductPage}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='SearchScreen'
        component={Search}
      />
      <Stack.Screen
        name='ProductPage'
        component={ProductPage}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  const Tabs = createBottomTabNavigator();
  const { t } = useTranslation();
  const {isLoggedIn, setIsLoggedIn} = useState(false);

  const refreshAuthState = async () => {
    const authState = await getAuthState();
    setIsLoggedIn(authState.isLoggedIn);
  };

  useEffect(() => {
    void refreshAuthState();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer onStateChange={() => void refreshAuthState()}>
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
              } else if(route.name === 'ProfileStack'){
                iconName = focused  
                  ? 'person-circle'
                  : 'person-circle-outline';
              }
              // This error is fine, everything works as it should (14.3.2026)
              return <Ionicons name={iconName} size={24} color="#EDE9C7"/>
            },

            header: ({ route }) => {
              if(route.name === 'Feed'){
                return <MainHeader isLoggedIn={isLoggedIn}/>
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
          <Tabs.Screen
            name="Feed"
            component={FeedNav}
            listeners={({ navigation }) => ({
              tabPress: () => {
                navigation.navigate('Feed', {
                  screen: 'LoginStack',
                  params: { screen: 'HomeFeed' },
                })
              },
            })}
            options={{ tabBarLabel: t("footer.feed") }}
          />
          <Tabs.Screen
            name="New Post"
            component={NewPostStackScreen}
            options={{ tabBarLabel: t("footer.newPost") }}
            listeners={({ navigation }) => ({
              tabPress: async (event) => {
                event.preventDefault();

                const loggedIn = await isAuthenticated();

                if (!loggedIn) {
                  navigation.navigate('Feed', {
                    screen: 'LoginStack',
                    params: { screen: 'LogIn' },
                  });
                  return;
                }

                navigation.navigate('New Post', {
                  screen: 'NewPostMenu',
                });
              },
            })}
          />
          <Tabs.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{ tabBarLabel: t("footer.profile") }}
            listeners={({ navigation }) => ({
              tabPress: async (event) => {
                event.preventDefault();

                const loggedIn = await isAuthenticated();

                if (!loggedIn) {
                  navigation.navigate('Feed', {
                    screen: 'LoginStack',
                    params: { screen: 'LogIn' },
                  });
                  return;
                }
                navigation.navigate('ProfileStack', {
                  screen: 'Profile',
                });
              },
            })}
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
