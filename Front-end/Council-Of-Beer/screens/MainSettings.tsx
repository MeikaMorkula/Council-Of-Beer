import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AppSettings from './AppSettings';
import UserSettings from './UserSettings';
import UserStatistics from './UserStatistics';

const Stack = createNativeStackNavigator();

function SettingsStack() {
  return(
    <Stack.Navigator initialRouteName='MainSettingsScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MainSettingsScreen' component={MainSettingsScreen}/>
      <Stack.Screen name='UserSettingsScreen' component={UserSettings}/>
      <Stack.Screen name='AppSettingsScreen' component={AppSettings}/>
      <Stack.Screen name='UserStatistics' component={UserStatistics}/>
    </Stack.Navigator>
  );
}

function MainSettingsScreen(){
  const navigation = useNavigation();
  return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingsNav} onPress={() => navigation.navigate('UserStatistics' as never)}>
                <Text style={styles.settingsText}>User Statistics</Text>
                <Ionicons name='chevron-forward' size={32} color='#EDE9C7' alignSelf='flex-end' marginTop='-27'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsNav} onPress={() => navigation.navigate('UserSettingsScreen' as never)}>
                <Text style={styles.settingsText}>User Settings</Text>
                <Ionicons name='chevron-forward' size={32} color='#EDE9C7' alignSelf='flex-end' marginTop='-27'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsNav} onPress={() => navigation.navigate('AppSettingsScreen' as never)}>
                <Text style={styles.settingsText}>App Settings</Text>
                <Ionicons name='chevron-forward' size={32} color='#EDE9C7' alignSelf='flex-end' marginTop='-27'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsNav}>
                <Text style={styles.settingsText}>Log Out</Text>
                <Ionicons name='chevron-forward' size={32} color='#EDE9C7' alignSelf='flex-end' marginTop='-27'/>
            </TouchableOpacity>
        </View>
    );
}

export default function MainSettings(){
    return(
        <SettingsStack/>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D190E',
    alignItems: 'center',
  },
  settingsNav: {
    width: '100%',
    backgroundColor: '#28200C',
    padding: 20
  },
  settingsText: {
    color: '#EDE9C7',
    fontSize: 16
  }
});