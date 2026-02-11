import { Button } from '@react-navigation/elements';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile(){

    return(
        <>
          <View style={styles.profileinfo}>
            <View style={styles.pfpiccont}>
              <Image style={styles.pfpic} source={require('../assets/beerpf.png')}/>
            </View>
            <View style={styles.pftextcont}>
              <View style={styles.usernamebtn}>
                <Text style={styles.username}>@ilovebeer</Text>
                <TouchableOpacity style={styles.followbtn}>
                  <Text>Follow</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pfstatscont}>
                <Text>Ratings</Text>
                <Text>Followers</Text>
                <Text>Following</Text>
              </View>
            </View>
          </View>
          <View style={styles.profilecontent}>
            <Text>Profile screen - main content</Text>
          </View>
        </>
    );
}

const styles = StyleSheet.create({
  profileinfo:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },
  profilecontent: {
    flex: 5,
  },
  pfpic: {
    width: 72,
    height: 72,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black'
  },
  pfpiccont: {
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    left: 25
  },
  pftextcont: {
    flexDirection: 'column'
  },
  usernamebtn: {
    flexDirection: 'row',
    columnGap: 10
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  followbtn: {
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'lightblue',
    padding: 8,
    width: 72
  },
  pfstatscont: {
    flexDirection: 'row',
    columnGap: 20
  },
});