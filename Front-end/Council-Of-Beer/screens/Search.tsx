import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

function ProductComponent(){
  return(
    <View style={styles.productCont}>
      <Image style={styles.productIcon}/>
      <View style={styles.productInfo}>
        <Text style={styles.productText}>Beer, 6,6%</Text>
        <Text style={styles.productText}>Brewery, Country</Text>
        <StarRatingDisplay 
          rating={3.5}
          starSize={24}
          starStyle={styles.productRating}
        />
      </View>
    </View>
  );
}

export default function Search(){

    return(
      <>
        <View style={styles.searchCont}>
          <View style={styles.searchSection}>
            <TextInput
                style={styles.searchField}
                placeholder='Search'
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name='search' size={32} color='black'/>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.resultArea}>
          <ProductComponent/>
        </View>
      </>
    );
}



const styles = StyleSheet.create({
  searchCont: {
    position: 'relative'
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchField:{
    backgroundColor: 'white',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    height: 65,
    width: '87%'
  },
  searchIcon: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 65,
  },
  resultArea: {
    position: 'relative'
  },
  productCont:{
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'dark gray',
    padding: 20
  },
  productIcon: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black'
  },
  productInfo: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  productText: {
    fontSize: 16,
    paddingBottom: 5,
  },
  productRating:{
    marginHorizontal: 2
  }
});