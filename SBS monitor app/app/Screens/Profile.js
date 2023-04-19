
import React from 'react';
import {

    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import ProfileUser from '../Components/ProfileUser';

import { Keyboard } from 'react-native';
import { baseURL } from '../../Config';
const Profile = ({ route }) => {



    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const Home = require('../assets/Home!active.png');
    const Dsheet = require('../assets/ADsheet!active.png');
    const OffDay = require('../assets/offdayactive.png');
    const Msheet = require('../assets/Dsheet!acive.png');
    const Profile = require('../assets/Profileactive.png');
    const background = require('../assets/BACKGROUD.png');
    const Proofile = require('../assets/Profile.png');

    const [profile, setProfile] = useState([]);

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const onKeyboardShow = () => {
        setKeyboardVisible(true);
    };

    const onKeyboardHide = () => {
        setKeyboardVisible(false);
    };


    const navigation = useNavigation();


    useEffect(() => {
        async function fetchData() {
            const userToken = await AsyncStorage.getItem('token');
            const decodedToken = jwtDecode(userToken);
            setUserId(decodedToken._id);
        }
        fetchData();
        if (userId) {
            fetchProfile(userId);
        }

    }, [userId]);

    const oneUser = profile.map((ProfUser) => (
        <ProfileUser key={ProfUser._id} ProfUser={ProfUser} />
    ));

    const fetchProfile = async (userId) => {
        try {
            const response = await axios.get(`${baseURL}/user/User/${userId}`);
            const data = response.data;
            setProfile(data);
            console.log(profile)
        } catch (error) {
            console.error(error);
        }
    };


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={Proofile} />
                <Image style={styles.background} source={background} />
            </View>

            <View style={styles.container1}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {oneUser}
                </ScrollView>
            </View>

            {!keyboardVisible && (
                <View style={styles.bottomNavigation}>
                    <TouchableOpacity
                        style={styles.navigationItem}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image style={styles.icon1} source={Home} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigationItem}>
                        <Image style={styles.icon1} source={Dsheet} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OffDay', { userId: userId })}
                        style={styles.navigationItem}
                    >
                        <Image style={styles.icon1} source={OffDay} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MonthlySheet')}
                        style={styles.navigationItem}
                    >
                        <Image style={styles.icon1} source={Msheet} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigationItem}>
                        <Image style={styles.icon} source={Profile} />
                        <Text style={styles.navigationText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container1: {
        height: '65%',
        width: '100%',
        position: 'absolute',
        top: '25%',
        flex: 1
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    label1: {
        color: '#234b9a'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        paddingTop: 10,
        color: '#234b9a'
    },
    title1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        paddingTop: 10,
        color: '#234b9a',
        fontFamily: 'sans-serif-condensed'
    },
    title3: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#234b9a',
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'

    },
    titleSpan: {
        color: 'white',

    },

    inputpicker: {
        width: 170,
        height: 60,
        marginBottom: 20,
        marginLeft: '25%',
        color: 'black',
        backgroundColor: 'white',
        margin: 10,

    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#234b9a'
    },

    logo: {
        position: 'absolute',
        height: '130%',
        resizeMode: "contain",
        right: '40%',
        zIndex: 1,
    },
    label: {
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        marginBottom: 5,
        color: 'black'
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        marginBottom: 20,
        color: 'black',
        backgroundColor: 'white',
        height: 52,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,


    },
    Button: {

        backgroundColor: '#234b9a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 20,
        width: 300,
        height: 49,
        alignItems: 'center',
        marginLeft: '12%',
        marginBottom: 70


    },

    buttonText: {
        color: '#dfdeee',
        fontSize: 16,

    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderRadius: 10,
        padding: 10,
        margin: 5,
        color: 'black',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        margin: 10,
        elevation: 3,
    },
    successContainer: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        width: 200,
        height: 50,
        top: '40%',
        left: '30%',
        zIndex: 1,

        alignItems: 'center'
    },

    successText: {
        color: 'white',
        fontWeight: 'bold',
    },
    picker: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
        backgroundColor: 'white',


    },
    pickerItem: {
        fontSize: 16,
        color: '#234b9a',
        textAlign: 'center',
    },

    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '7%',
        backgroundColor: '#234b9a',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',

        borderRadius: 2
    },
    navigationItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 40,
        height: 30,
        marginBottom: 1
    },
    icon1: {
        width: 40,
        height: 40,
        marginBottom: 1
    },

    navigationText: {
        fontSize: 12,
        color: 'white'
    },
    background: {

        borderRadius: 30,
        width: '100%'
    },

    headerContainer: {

        marginTop: "-159%",
        width: '100%'

    },
})

export default Profile