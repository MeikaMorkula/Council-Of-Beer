import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';


export default function Post(){
    return(
        <ScrollView style={styles.container}>
            <View style={styles.postHeader}>
                <Image style={styles.userPfp}/>
                <Text style={styles.postUsrname}>@username</Text>
            </View>
            <View style={styles.postImgCont}>
                <Image style={styles.postImg}/>
            </View>
            <View style={styles.postBeerInfoCont}>
                <View style={styles.infoRow}>
                    <Text style={{color: '#EDE9C7', fontSize: 24}}>Beer Name, </Text>
                    <StarRatingDisplay 
                        rating={3.5}
                        starSize={22}
                        starStyle={styles.productRating}
                    />
                </View>
                <View style={styles.infoRow}>
                    <Text style={{color: '#EDE9C7', fontSize: 20}}>5.3%, </Text>
                    <Text style={{color: '#EDE9C7', fontSize: 20}}>Brewery</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={{color: '#EDE9C7', fontSize: 20}}>Country</Text>
                </View>
            </View>
            <View style={styles.postReviewCont}>
                <Text style={{color: '#EDE9C7', fontSize: 24}}>Review</Text>
                <Text style={{color: '#EDE9C7', fontSize: 18, textAlign: 'center'}}>Kunnioitettu sotasankari Eversti Johan August Sandels ajatteli aina yhtä taistelua pidemmälle. Eräs nuorempi upseeri ehdotti tiukassa tilanteessa joukkojen ryhmittämistä puoli kilometriä taaemmaksi metsä suojaan. “Ei hitossa, silloinhan antaisimme viholliselle monta hehtaaria viljavaa ohrapeltoa ilmaiseksi”, vastasi Sandels hörpäten tuopista pehmeää olutta.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D190E',
  },
  postHeader: {
    flexDirection: 'row'
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
  postUsrname:{
    color: '#EDE9C7',
    fontSize: 18,
    textAlignVertical: 'center', // may not work with iOS
  },
  postImgCont: {
    height: 400
  },
  postImg:{
    backgroundColor: '#926C43',
    height: '100%'
  },
  postBeerInfoCont: {
    padding: 20
  },
  infoRow: {
    flexDirection: 'row'
  },
  productRating:{
    marginHorizontal: 2,
    marginTop: 5
  },
  postReviewCont: {
    padding: 20
  }
});