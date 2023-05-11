import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../Config';
export default function ResetScreen() {
    const navigation = useNavigation();
    const [Email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [SuccMessage, setSuccMessage] = useState('');
    const myImage = require('../assets/sbs.png');


    async function Reset(event) {
        event.preventDefault();
        if (!Email) {
            setErrorMessage("Please fill out all fields");
            return;
        }
        const updatedDaySheet = {

            Email: Email,

        };

        try {
            const response = await axios.put(`${baseURL}/Mail/updatePassword/${Email}`, updatedDaySheet);
            const data = response.data;
            console.log(data)
            const Mail = await axios.post(`${baseURL}/Mail/Send`, {
                Email: Email,
                subject: '[SBS]Password reset for SBS Application'
            })
            const dataMail = Mail.data
            console.log(dataMail)
            setSuccMessage('Reset Email Successfully ! Please chaeck your Email Inbox');

        } catch (error) {
            console.log(error);
            setErrorMessage('Invalid Email');
        }
    }




    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                Smart <Text style={styles.titleSpan}>Business Solution</Text>
            </Text>
            <Image style={styles.logo} source={myImage} />
            <Text style={styles.subtitle}>Reset your Password</Text>
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            {SuccMessage ? (
                <Text style={styles.succ}>{SuccMessage}</Text>
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

            <TouchableOpacity
                style={styles.loginButton}
                onPress={Reset}
            >
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}>
                    Have an account? Login
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
    succ: {
        color: 'green',
        marginBottom: 10
    }
};