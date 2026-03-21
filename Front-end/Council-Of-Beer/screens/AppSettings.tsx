import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function AppSettings(){
    return(
        <View style={styles.container}>
            <Text>Home/Feed screen - main content</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
});