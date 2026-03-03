import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function MainSettings(){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingsNav}>
                <Text>User Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsNav}>
                <Text>App Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsNav}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsNav: {
    width: '100%',
    backgroundColor: 'light blue'
  }
});