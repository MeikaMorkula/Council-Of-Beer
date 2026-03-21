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
                placeholderTextColor={'#EDE9C7'}
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name='search' size={32} color='#EDE9C7'/>
              </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={styles.resultArea}>
          <ProductComponent/>
        </ScrollView>
      </>
    );
}



const styles = StyleSheet.create({
  searchCont: {
    position: 'relative',
    backgroundColor: '#1D190E'
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#1D190E'
  },
  searchField:{
    backgroundColor: '#28200C',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    height: 65,
    width: '87%'
  },
  searchIcon: {
    backgroundColor: '#28200C',
    color: '#EDE9C7',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 65,
  },
  resultArea: {
    position: 'relative',
    backgroundColor: '#1D190E'
  },
  productCont:{
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EDE9C7',
    padding: 20
  },
  productIcon: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#EDE9C7'
  },
  productInfo: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  productText: {
    fontSize: 16,
    paddingBottom: 5,
    color: '#EDE9C7' 
  },
  productRating:{
    marginHorizontal: 2
  }
});