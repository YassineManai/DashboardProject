import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../Config';
export default function LoginScreen() {
    const navigation = useNavigation();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const myImage = require('../assets/sbs.png');
    console.log(Email)
    console.log(Password)

    async function loginUser(event) {
        event.preventDefault();
        if (!Email || !Password) {
            setErrorMessage("Please fill out all fields");
            return;
        }
    
        try {
            const response = await axios.post(`${baseURL}/user/Login`, {
                Email: Email,
                Password: Password,
            });
            const data = response.data;
            console.log(data.mytoken);
            if (data.mytoken) {
                // Save the token to local storage
                await AsyncStorage.setItem('token',data.mytoken);
                setErrorMessage('Login successful');     
                navigation.navigate('Home');
                setErrorMessage(''); 
                setEmail('');
                setPassword('');   
              
                // Redirect to another screen or perform other actions on success
            } else {
                setErrorMessage('An error occurred while logging in');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('An error occurred while logging in');
        }
    }




    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                Smart <Text style={styles.titleSpan}>Business Solution</Text>
            </Text>
            <Image style={styles.logo} source={myImage} />
            <Text style={styles.subtitle}>Sign in to your account.</Text>
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={Email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={Password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
         <Text style={styles.forgotPassword} >Forgot Password?</Text>
          
            <TouchableOpacity
                style={styles.loginButton}
                onPress={loginUser}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>
                    Don't have an account? Sign up
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#234b9a',

    },
    titleSpan: {
        color: 'black',

    },
    logo: {

        height: '10%',
        resizeMode: "contain"
    },
    subtitle: {
        fontSize: 13,
        marginBottom: 10,
       

        fontWeight: 'bold',
        color: '#a1a4ad'
    },
    input: {

        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        color: 'black',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 3,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 10,
        color: '#5c7fda',
      
    },
    loginButton: {
        backgroundColor: '#234b9a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 20,
        width: 300,
        height: 49,
        alignItems: 'center'
    },
    buttonText: {
        color: '#dfdeee',
        fontSize: 16,

    },
    signupText: {
        marginTop: 20,
        color: '#5c7fda'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
};