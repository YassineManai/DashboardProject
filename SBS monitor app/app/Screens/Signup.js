import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import validator from 'email-validator';
import { baseURL } from '../../Config';
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const myImage = require('../assets/sbs.png');




    const handleSubmit = async () => {
        // Form validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            setError('Please fill out all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
       
        if (!validator.validate(email)) {
            setError('Please enter a valid email address');
            return;
          }

        // Make API request to sign up user
        axios.post(`${baseURL}/user/Signup`, {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            Password: password,
        })
            .then((response) => {
                setError('Signup successful! Please log in');
                navigation.navigate('Login');
                console.log(response);
                // Handle successful signup
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred, please try again');
            });
    };

    console.log(email)

    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                Smart <Text style={styles.titleSpan}>Business Solution</Text>
            </Text>
            <Image style={styles.logo} source={myImage} />
            <Text style={styles.subtitle}>Sign Up to your account.</Text>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCompleteType="name"
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCompleteType="name"
            />

            <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                defaultValue="your.email@example.com"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Creat Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}>
                    have an account? Login
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
        color: 'white'
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