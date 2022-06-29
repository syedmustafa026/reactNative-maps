import React, { useState,useContext } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector, useDispatch } from 'react-redux'
import themecontext from '../config/themeContext'
import { setName, setEmail, setPassword } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import theme from '../config/theme'
const Colors = { primary: 'white',secondary: "black"}
function Signup({ navigation }) {
const theme = useContext(themecontext);
  const { name, email, password } = useSelector(state => state.userReducer)
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch()

  let validatePass = (pass) => {
    const passregex = /^(?=.*[A-Z])+(?=.{6,})/
    return passregex.test(pass)
  }

  async function clickSignUp() {
    let validateEmail = (email) => {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailRegex.test(email);
    }
    if (!validateEmail(email) && name.length == 0 && !validatePass(password)) {
      Alert.alert("Error", "Please fill the all Input")
    }
    else if (validateEmail(email) && name.length != 0 && validatePass(password)) {
        try {
        Alert.alert("Success", "You are Registered")
        await AsyncStorage.setItem('Theme', theme)
        await AsyncStorage.setItem('UserName', name)
        await AsyncStorage.setItem('Email', email)
        await AsyncStorage.setItem('Password', password)
        console.log('user save ho gaya ')
        navigation.navigate('Signin')
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  function clickSignIn() {
    navigation.navigate('Signin')
  }
  return (
    <View style={style.container} >
      <KeyboardAvoidingView>
        <View style={style.Header}>
          <Text style={style.headingtext}>Register Now!</Text>
        </View>
        <View style={[style.form,{backgroundColor:theme.background}]}>
          <Text style={[style.text,{color: theme.color}]}>Your Name</Text>
          <View style={style.inputBox}>
            <Feather name='lock' light size={20} color={'#019386'} />
            <TextInput onChangeText={(value) => dispatch(setName(value))}  style={[style.input,{color:theme.color}]} placeholderTextColor={theme.color} placeholder='Enter your Name' />
          </View>
          <Text style={[style.text,{color: theme.color}]}>Email</Text>
          <View style={style.inputBox}>
            <FontAwesome5 name='user' size={20} color={'#019386'} />
            <TextInput onChangeText={(value) => dispatch(setEmail(value))} placeholderTextColor={theme.color} keyboardType='email-address' style={[style.input,{color:theme.color}]} placeholder='Your Email' />
          </View>
          <Text style={[style.text,{color: theme.color}]}>Password</Text>
          <View style={style.inputBox}>
            <Feather name='lock' light size={20} color={'#019386'} />
            <TextInput onChangeText={(value) => dispatch(setPassword(value))} secureTextEntry={hidePass ? true : false} style={[style.input,{color:theme.color}]} placeholderTextColor={theme.color} placeholder='Your Password' />
            <FontAwesome5 style={style.eye} name={hidePass ? 'eye-slash' : 'eye'} size={15} color={'#019386'} onPress={() => setHidePass(!hidePass)} />
          </View>
          <Text style={{ fontSize: 12, color: theme.color }}>By Signing up you agree to our <Text style={{ fontWeight: 'bold' }}>Terms of our Services</Text> and <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text></Text>
          <View style={style.buttonSec}>
            <TouchableOpacity style={style.buttonFilled} onPress={() => clickSignUp()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonOutlined} onPress={() => clickSignIn()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#019386' }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#019386'
  },
  Header: {
    height: 200,
    backgroundColor: '#019386',
    justifyContent: 'center',

  },
  headingtext: {
    fontSize: 32,
    color: '#fff',
    margin: 15,
    marginTop: 80
  },
  form: {
    padding: 25,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#fff',
    height: 577,
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },
  inputBox: {
    flexDirection: 'row',
    width: "100%",
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 0.5,
    
    borderBottomColor: 'grey',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
  },
  input: {
    marginLeft: 5,
    marginTop: 3,
    width: 250,
    
  },
  eye: {
    position: 'absolute',
    right: 10,
  },
  buttonSec: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  buttonFilled: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 60,
    backgroundColor: '#08bfaf',
    borderRadius: 20,
  },
  buttonOutlined: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 60,
    borderColor: '#08bfaf',
    borderWidth: 2,
    marginVertical: 10,
    backgroundColor: '#ffff',
    borderRadius: 20,
  },
  forgot: {
    fontWeight: 'bold',
    color: '#019386',
    marginVertical: 10
  }
})
export default Signup;