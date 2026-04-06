import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserStatistics(){
    return(
        <View style={styles.statisticsCont}>
            <Text style={styles.statisticsTitle}>Your statistics</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statisticsCont: {
        flex: 1,
        backgroundColor: '#1D190E'
    },
    statisticsTitle: {
        color: '#EDE9C7',
        fontSize: 24,
        fontFamily: "GermaniaOne400_Regular",
    },
}) 