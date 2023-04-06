import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
            const response = await axios.post('http://192.168.1.16:3000/user/Login', {
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

    navigation.setOptions({
        headerStyle: {
            backgroundColor: '#0d101b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
            <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                    SBS Monitor
                </Text>
            </View>
        ),
    });



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
                autoCompleteType="Email"
                keyboardType="Email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={Password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.forgotPassword}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>
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
        backgroundColor: '#0d101b'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#234b9a',

    },
    titleSpan: {
        color: 'white',

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
        color: 'black'
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 10,
        color: 'red'
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