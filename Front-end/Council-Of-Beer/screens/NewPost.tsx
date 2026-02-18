import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewPost(){

    return(
        <View style={styles.container}>
            <Text>New post screen - main content</Text>
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