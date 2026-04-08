import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function CommentObj(){
  return(
    <View style={styles.commentObjCont}>
      <View style={styles.userCommentHeader}>
        <Image style={styles.userPfp}/>
        <View style={{flexDirection: 'column'}}>
            <Text style={styles.commentUsrname}>@Username</Text>
            <View style={{maxWidth: '90%'}}>
                <Text style={styles.commentTxt}>Kunnioitettu sotasankari Eversti Johan August Sandels ajatteli aina yhtä taistelua pidemmälle.</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

export function CommentArea(){
    return(
        <View style={styles.commentAreaCont}>
            <Text style={{color: '#EDE9C7', fontSize: 24}}>Comments</Text>
            <View style={styles.writeCommentCont}>
              <Image style={styles.userPfp}/>
                <TextInput
                    style={styles.commentTxtField}
                    placeholder='Write your comment...'
                    placeholderTextColor={'#EDE9C7'}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity style={styles.commentIcon}>
                    <Ionicons name='chatbox' size={32} color='#EDE9C7'/>
                </TouchableOpacity>
            </View>
            <ScrollView style={{height: 0}} nestedScrollEnabled={true}>
                <View style={styles.allCommentsCont}>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                    <CommentObj/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  commentAreaCont: {
    height: 700
  },
  writeCommentCont: {
    flexDirection: 'row',
    backgroundColor: '#28200C',
  },
  userPfp: {
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#EDE9C7',
    width: 45,
    height: 45,
    margin: 10
  },
  commentTxtField: {
    backgroundColor: '#28200C',
    color: '#EDE9C7',
    padding: 20,
    fontSize: 14,
    width: '70%'
  },
  commentIcon: {
    backgroundColor: '#28200C',
    color: '#EDE9C7',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  allCommentsCont: {
    paddingTop: 10,
  },
  commentObjCont: {
    borderWidth: 0.5,
    borderColor: '#EDE9C7',
    borderRadius: 8,
    maxHeight: 250,
    height: 'auto',
    backgroundColor: '#28200C',
    padding: 5,
    marginTop: 10
  },
  userCommentHeader: {
    flexDirection: 'row'
  },
  commentUsrname:{
    color: '#EDE9C7',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10
  },
  commentTxt: {
    color: '#EDE9C7',
    fontSize: 14,
  }
});