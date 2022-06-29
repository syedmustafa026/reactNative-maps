import React, { useState, useContext } from 'react'
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { EventRegister } from 'react-native-event-listeners'
import style from './formStyle'
import themecontext from '../config/themeContext'
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
function Home({ navigation }) {
  const { name, email } = useSelector(state => state.userReducer)
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const theme = useContext(themecontext);
  async function LogOut() {
    await AsyncStorage.removeItem('UserName')
    await AsyncStorage.removeItem('Email')
    console.log('user deleted')
    navigation.navigate('Signup')
  }
  return (
    <View style={style.container} >
      <KeyboardAvoidingView>
        <View style={style.Header}>
          <Text style={style.headingtext}>Home screen !</Text>
        </View>
        <View style={[style.form, { backgroundColor: theme.background }]}>
          <View style={{ marginVertical: 50 }}>
            <Text style={[style.text,{color:theme.color}]}>Your Name: {name}</Text>
            <Text style={[style.text,{color:theme.color}]}>Your Email: {email}</Text>
          </View>
          <View style={style.buttonSec}>
            <TouchableOpacity style={style.buttonFilled} onPress={() => LogOut()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonOutlined} onPress={() => navigation.navigate('Maps')}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#08bfaf' }}>Go to Maps</Text>
            </TouchableOpacity>
            <Text style={{ color: theme.color }}>Dark Mode
              <Switch value={isSwitchOn} onValueChange={(value) => {
                onToggleSwitch(value)
                EventRegister.emit("Changetheme", value)
              }}
              />
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Home;