import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserStatistics(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.pop()} style={{position: 'absolute', top: 8, zIndex: 9999}} >
                <Ionicons name="chevron-back" size={32} color="#EDE9C7" />
            </TouchableOpacity>
            <View style={styles.statisticsCont}>
            <Text style={styles.statisticsTitle}>Your statistics</Text>
            <ScrollView>
                <View style={styles.statisticsView}>
                    <View style={styles.singleStatistic}>
                        <Text style={styles.statisticsTxt}>Statistic 1</Text>
                        <Image style={styles.statistic}source={require('../assets/placeholdergraph.png')}/>
                    </View>
                    <View style={styles.singleStatistic}>
                        <Text style={styles.statisticsTxt}>Statistic 2</Text>
                        <Image style={styles.statistic}source={require('../assets/placeholdergraph.png')}/>
                    </View>
                    <View style={styles.singleStatistic}>
                        <Text style={styles.statisticsTxt}>Statistic 3</Text>
                        <Image style={styles.statistic}source={require('../assets/placeholdergraph.png')}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D190E'
    },
    statisticsCont: {
        flex: 1,
        backgroundColor: '#1D190E'
    },
    statisticsTitle: {
        color: '#EDE9C7',
        fontSize: 32,
        fontFamily: "GermaniaOne400_Regular",
        padding: 20,
        textAlign: 'center'
    },
    statisticsView:{
        padding: 10
    },
    singleStatistic: {
        paddingTop: 10
    },
    statisticsTxt: {
        color: '#EDE9C7',
        fontSize: 18
    },
    statistic: {
        width: '100%',
        height: 275,
        borderWidth: 0.5,
        borderColor: '#EDE9C7',
        borderRadius: 8
    },
}) 