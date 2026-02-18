import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Search(){

    return(
        <View style={styles.container}>
            <Text>Search screen - main content</Text>
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