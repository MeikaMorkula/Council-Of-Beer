import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddBeer from './AddBeer';

export default function NewPost(){

    return(
        <AddBeer></AddBeer>
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