import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

export default function Profile(){

    return(
        <>
          <View style={styles.profileinfo} >
            <View style={styles.pfpiccont}>
              <Image style={styles.pfpic} source={require('../assets/beerpf.png')}/>
            </View>
            <View style={styles.pftextcont} >
              <View style={styles.usernamebtn}>
                <Text style={styles.username}>@ilovebeer</Text>
                <TouchableOpacity style={styles.followbtn}>
                  <Text>Follow</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pfstatscont} >
                <View style={styles.stats}>
                  <Text style={styles.numstat}>69</Text>
                  <Text>Ratings</Text>
                </View>
                <View style={styles.stats}>
                  <Text style={styles.numstat}>69</Text>
                  <Text>Followers</Text>
                </View>
                <View style={styles.stats}>
                  <Text style={styles.numstat}>69</Text>
                  <Text>Following</Text>
                </View>
              </View>
            </View>
          </View>
          <ScrollView horizontal={ true } style={{height: 0}}>
              <Image style={styles.collectionImg}/>
              <Image style={styles.collectionImg}/>
              <Image style={styles.collectionImg}/>
              <Image style={styles.collectionImg}/>
              <Image style={styles.collectionImg}/>
              <Image style={styles.collectionImg}/>
              <Image style={styles.collectionImg}/>
          </ScrollView>
          <View style={styles.profilecontent}>            
            <ScrollView style={{height: 0}}>
              <View style={styles.feed}>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
                <Image style={styles.feedImg}/>
              </View>
            </ScrollView>
          </View>
        </>
    );
}

const styles = StyleSheet.create({
  profileinfo:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: -50
  },
  profilecontent: {
    flex: 5,
    backgroundColor: '#fff'
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
    paddingTop: 10,
    flexDirection: 'row',
    columnGap: 20,
  },
  stats: {
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: 5
  },
  numstat:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  collectionImg: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10
  },
  feedImg: {
    width: '33%',
    height: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  feed: {
    flex: 0.33,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});