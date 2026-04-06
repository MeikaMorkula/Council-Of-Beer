import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

const langData = [
  { label: 'English', value: 'en'},
  { label: 'Finnish', value: 'fi'}
];


export default function AppSettings(){
  const [ lanValue, setLanValue ] = useState('en');
  const [ notifEnabled, setNotifEnabled ] = useState(true);
  const [ commentNotifsEnabled, setCommentNotifsEnabled ] = useState(true);
  const [ postLikeNotifsEnabled, setPostLikeNotifsEnabled ] = useState(true);
  const [ newFollowerNotifsEnabled, setNewFollowerNotifsEnabled ] = useState(true);
  const navigation = useNavigation();

    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.pop()} style={{position: 'absolute', top: 8}} >
            <Ionicons name="chevron-back" size={32} color="#EDE9C7" />
          </TouchableOpacity>
            <View style={styles.appSettingsCont}>
              <View style={styles.langCont}>
                <Text style={styles.langText}>Language</Text>
                <Dropdown
                  style={[styles.langDropdown]}
                  containerStyle={styles.dropdownCont}
                  selectedTextStyle={styles.dropdownText}
                  itemContainerStyle={styles.dropdownCont}
                  itemTextStyle={styles.dropdownText}
                  activeColor='#3B2917'
                  data={langData}
                  labelField="label"
                  valueField="value"
                  value={lanValue}
                  onChange={item => {
                    setLanValue(item.value);
                  }}
                />
              </View>
              <View style={styles.notifCont}>
                <Text style={styles.langText}>Notifications</Text>
                <Switch
                  trackColor={{false: '#EDE9C7', true: '#EFC06D'}}
                  thumbColor={notifEnabled ? '#E06F24' : '#EFC06D'}
                  onValueChange={() => setNotifEnabled(previousState => !previousState)}
                  value={notifEnabled}
                  style={{ transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                />
                </View>
                  <View style={styles.innerNotifCont}>
                    <View style={styles.singleNotif}>
                      <Text style={styles.innerNotifText}>Comments on posts</Text>
                      <Switch
                        trackColor={{false: '#EDE9C7', true: '#EFC06D'}}
                        thumbColor={commentNotifsEnabled ? '#E06F24' : '#EFC06D'}
                        onValueChange={() => setCommentNotifsEnabled(previousState => !previousState)}
                        value={commentNotifsEnabled}
                        style={{ transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                      />
                    </View>
                    <View style={styles.singleNotif}>
                      <Text style={styles.innerNotifText}>Likes on posts</Text>
                      <Switch
                        trackColor={{false: '#EDE9C7', true: '#EFC06D'}}
                        thumbColor={postLikeNotifsEnabled ? '#E06F24' : '#EFC06D'}
                        onValueChange={() => setPostLikeNotifsEnabled(previousState => !previousState)}
                        value={postLikeNotifsEnabled}
                        style={{ transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                      />
                    </View>
                    <View style={styles.singleNotif}>
                      <Text style={styles.innerNotifText}>New Followers</Text>
                      <Switch
                        trackColor={{false: '#EDE9C7', true: '#EFC06D'}}
                        thumbColor={newFollowerNotifsEnabled ? '#E06F24' : '#EFC06D'}
                        onValueChange={() => setNewFollowerNotifsEnabled(previousState => !previousState)}
                        value={newFollowerNotifsEnabled}
                        style={{ transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                      />
                    </View>
                  </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D190E',
  },
  appSettingsCont:{
    padding: 30,
    alignItems: 'flex-start'
  },
  langCont: {
    flexDirection: 'row',
    width: '100%',
  },
  langText:{
    fontSize: 20,
    color: '#EDE9C7',
    textAlignVertical: 'center', // may not work with iOS
    paddingRight: 40,
  },
  langDropdown:{
    height: 56,
    borderColor: '#EDE9C7',
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 10,
    width: '50%',
    color: '#EDE9C7',
  },
  dropdownText: {
    color: '#EDE9C7'
  },
  dropdownCont:{
    backgroundColor: '#28200C',
    color: '#EDE9C7',
    borderWidth: 0,
    borderColor: 'null'
  },
  notifCont: {
    paddingTop: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  innerNotifCont: {
    paddingLeft: 40,
    paddingTop: 10
  },
  singleNotif: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  innerNotifText:{
    color: '#EDE9C7',
    fontSize: 18,
    textAlignVertical: 'center', // may not work with iOS
  },
});