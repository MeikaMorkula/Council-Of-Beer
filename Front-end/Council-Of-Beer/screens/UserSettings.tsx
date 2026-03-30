import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function UserSettings(){
  const [ newUsername, setNewUsername ] = useState("");
  const [ currentPswd, setCurrentPswd ] = useState("");
  const [ newPswd, setNewPswd ] = useState("");
  const [ newPswdAgain, setNewPswdAgain ] = useState("");
  
    return(
        <View style={styles.container}>
            <View style={styles.changePfCont}>
              <Image style={styles.downloadPfPic}/>
              <View style={styles.downloadPfCont}>
                <Text style={[{fontSize: 18, color: '#EDE9C7'}]}>Change profile picture</Text>
                <TouchableOpacity style={styles.downloadPfBtn}>
                  <Ionicons name='download-outline' size={24} color='#E06F24'/>
                  <Text style={styles.downloadBtnTxt}>Download</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.changeUsrCont}>
              <Text style={{fontSize: 18, color: '#EDE9C7'}}>Change username</Text>
              <TextInput
                style={styles.usrNameField}
                editable={false}
                placeholder='username'
                placeholderTextColor={'#EDE9C7'}
              />
              <View style={styles.changeUsrFieldCont}>
                <TextInput
                  style={[styles.usrNameField, { width: '95%'}]}
                  placeholder='Enter username...'
                  placeholderTextColor={'#EDE9C7'}
                  value={newUsername}
                  onChangeText={setNewUsername}
                />
                <TouchableOpacity onPress={() => setNewUsername("")}>
                  <Ionicons style={styles.changeUsrIcon} name='close-circle-outline' size={24} color='#EDE9C7'/>
                </TouchableOpacity>                
              </View>
              <TouchableOpacity style={styles.changeUsrBtn}>
                <Text style={{fontSize: 16, color: '#E06F24'}}>Change username</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.changePswdCont}>
              <Text style={[{fontSize: 18, color: '#EDE9C7'}]}>Change password</Text>
              <View style={styles.changeUsrFieldCont}>
                <TextInput
                  style={[styles.usrNameField, { width: '95%'}]}
                  placeholder='Enter current password...'
                  secureTextEntry={true}
                  placeholderTextColor={'#EDE9C7'}
                  value={currentPswd}
                  onChangeText={setCurrentPswd}
                />
                <TouchableOpacity onPress={() => setCurrentPswd("")}>
                  <Ionicons style={styles.changeUsrIcon} name='close-circle-outline' size={24} color='#EDE9C7'/>
                </TouchableOpacity>                
              </View>
              <View style={styles.changeUsrFieldCont}>
                <TextInput
                  style={[styles.usrNameField, { width: '95%'}]}
                  placeholder='Enter new password...'
                  secureTextEntry={true}
                  placeholderTextColor={'#EDE9C7'}
                  value={newPswd}
                  onChangeText={setNewPswd}
                />
                <TouchableOpacity onPress={() => setNewPswd("")}>
                  <Ionicons style={styles.changeUsrIcon} name='close-circle-outline' size={24} color='#EDE9C7'/>
                </TouchableOpacity>                
              </View>
              <View style={styles.changeUsrFieldCont}>
                <TextInput
                  style={[styles.usrNameField, { width: '95%'}]}
                  placeholder='Enter new password again...'
                  secureTextEntry={true}
                  placeholderTextColor={'#EDE9C7'}
                  value={newPswdAgain}
                  onChangeText={setNewPswdAgain}
                />
                <TouchableOpacity onPress={() => setNewPswdAgain("")}>
                  <Ionicons style={styles.changeUsrIcon} name='close-circle-outline' size={24} color='#EDE9C7'/>
                </TouchableOpacity>                
              </View>
              <TouchableOpacity style={styles.changeUsrBtn}>
                <Text style={{fontSize: 16, color: '#E06F24'}}>Change password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteAccBtn}>
                <Text style={{fontSize: 16, color: '#e02424', fontWeight: 'bold'}}>Delete account</Text>
              </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D190E',
    padding: 20
  },
  changePfCont: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  downloadPfCont: {
    paddingLeft: 10
  },
  downloadPfPic: {
    width: 75,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#EDE9C7',
    marginLeft: 10
  },
  downloadPfBtn:{
    width: 120,
    backgroundColor: '#EDE9C7',
    borderRadius: 4,
    padding: 5,
    flexDirection: 'row',
    marginTop: 10
  },
  downloadBtnTxt: {
    fontSize: 16, 
    color: '#E06F24', 
    textAlignVertical: 'center', 
    paddingLeft: 10
  },
  changeUsrCont: {
    paddingBottom: 20
  },
  changeUsrFieldCont:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  usrNameField: {
    backgroundColor: '#28200C',
    color: '#EDE9C7',
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#EDE9C7',
    borderRadius: 4,
  },
  changeUsrBtn:{
    width: 135,
    backgroundColor: '#EDE9C7',
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    marginTop: 10
  },
  changeUsrIcon: {
    position: 'absolute',
    right: 7,
    top: -7
  },
  changePswdCont: {
    paddingBottom: 20
  },
  deleteAccBtn: {
    width: 120,
    backgroundColor: '#edc7c7',
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    marginTop: 10,
  }
});