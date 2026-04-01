import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function PostObj() {
  const navgiation = useNavigation();
  return(
    <TouchableOpacity style={{width: 140}} onPress={() => navgiation.navigate('ProductPage')}>
      <Image style={styles.collectionImg}/>
    </TouchableOpacity>
  )
}

export default function Collection() {
    return(
        <View style={styles.container}>
            <View style={styles.collectionHeader}>
                <Image style={styles.userPfp}/>
                <View style={styles.collectionInfo}>
                    <Text style={styles.title}>Collection name</Text>
                    <Text style={styles.usrName}>Owner: @username</Text>
                </View>
                <View style={styles.collectionAmount}>
                    <Text style={styles.collectionAmountNum}>32</Text>
                    <Text style={styles.collectionAmountTxt}>Beers</Text>
                </View>
            </View>
            <ScrollView style={{height: 0}}>
                <View style={styles.collectionContent}>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                    <PostObj/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D190E',
    },
    collectionHeader:{
        flexDirection: 'row',
        paddingTop: 30
    },
    userPfp: {
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#EDE9C7',
        width: 72,
        height: 72,
        margin: 10
    },
    collectionInfo:{
        paddingTop: 15
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#EDE9C7',
        fontFamily: "GermaniaOne400_Regular",
    },
    usrName: {
        color: '#EDE9C7',
    },
    collectionAmount:{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25
    },
    collectionAmountTxt:{
        color: '#EDE9C7',
        fontSize: 18
    },
    collectionAmountNum:{
        color: '#EDE9C7',
        fontSize: 24
    },
    collectionContent: {
        flex: 0.33,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '101%',
        marginTop: 20
    },
    collectionImg:{
        height: 150,
        backgroundColor: 'white',
        borderWidth: 0.25,
        borderColor: 'black'
    },
});