import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewPost(){

    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text>Council of Beer</Text>
            </View>
            <View style={styles.maincontainer}>
                <Text>New post screen - main content</Text>
            </View>
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
  topbar:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  maincontainer: {
    alignItems: 'center',
    backgroundColor: '#a3a3a3',
    justifyContent: 'center',
    flex: 3
  },
});