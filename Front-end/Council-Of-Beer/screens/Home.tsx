import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

function PostObj(){
  return(
    <View style={styles.postCont}>
      <View style={styles.postHeader}>
        <Image style={styles.postPfp}/>
        <View style={styles.postInfoCont}>
          <Text style={styles.postUsrname}>@username</Text>
          <Text style={{color: '#EDE9C7', fontSize: 18}}>Beer Name</Text>
          <StarRatingDisplay 
            rating={3.5}
            starSize={18}
            starStyle={styles.productRating}
          />
        </View>
      </View>
      <View style={styles.postImgCont}>
        <Image style={styles.postImg}/>
      </View>
    </View>
  );
}


export default function Home(){
    return(
        <ScrollView style={styles.container}>
          <PostObj/>
          <PostObj/>
          <PostObj/>
          <PostObj/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D190E'
  },
  postCont: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDE9C7'
  },
  postHeader: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  postPfp: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#EDE9C7',
    backgroundColor: 'white'
  },
  postUsrname:{
    color: '#EDE9C7',
    fontSize: 22,
    paddingBottom: 5
  },
  postInfoCont: {
    flexDirection: 'column',
    marginLeft: 10
  },
  productRating: {
    marginHorizontal: 2,
    marginTop: 5
  },
  postImgCont: {
    alignItems: 'flex-end',
    paddingBottom: 10
  },
  postImg:{
    height: 300,
    width: 300,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#EDE9C7',
    backgroundColor: 'white'
  },
});