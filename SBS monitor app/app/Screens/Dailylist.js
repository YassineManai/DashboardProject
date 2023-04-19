import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Buttonn, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { baseURL } from '../../Config';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCallback } from 'react';
import DayCard from '../Components/DayCard';


const DailyList = ({ route }) => {

    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();
    const myImage = require('../assets/sbs.png');
    const Home = require('../assets/Home!active.png');
    const Dsheet = require('../assets/ADsheet!active.png');
    const OffDay = require('../assets/offdayactive.png');
    const Msheet = require('../assets/Dsheetactive.png');
    const Profile = require('../assets/Profile!active.png');
    const background = require('../assets/BACKGROUD.png');
    const Monthlist = require('../assets/Monthlist.png');

    const [DailySheet, setDailySheet] = useState([]);


    const { id } = route.params;
    console.log(id)
    const { month } = route.params;
    console.log(month)
    const { year } = route.params;
    console.log(year)


    useEffect(() => {
        async function fetchData() {
            const userToken = await AsyncStorage.getItem('token');
            const decodedToken = jwtDecode(userToken);
            setUserId(decodedToken._id);
        }
        fetchData();
        if (id) {
            fetchDailySheet();
        }

    }, [id]);

    const fetchDailySheet = async () => {
        try {
            const response = await axios.get(`${baseURL}/dailySheet/allDailySheet/${id}`);
            setDailySheet(response.data);
        } catch (error) {
            console.error(error);
        }
    };


   
    const listDsheet = DailySheet.map((Dsheet) => (
        <DayCard key={Dsheet._id} Dsheet={Dsheet} />
    ));



    return (
        <View style={styles.container}>
            <Image style={styles.background} source={background} />
            <Image style={styles.logo} source={Monthlist} />






            <View style={styles.container1}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {listDsheet}
                </ScrollView>
            </View>

            <View style={styles.bottomNavigation}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navigationItem}>
                    <Image style={styles.icon1} source={Home} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DailySheet', { userId: userId })} style={styles.navigationItem}>
                    <Image style={styles.icon1} source={Dsheet} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('OffDay', { userId: userId })} style={styles.navigationItem} >
                    <Image style={styles.icon1} source={OffDay} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MonthlySheet')} style={styles.navigationItem} >
                    <Image style={styles.icon} source={Msheet} />
                    <Text style={styles.navigationText}>Msheet</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navigationItem} >
                    <Image style={styles.icon1} source={Profile} />
                </TouchableOpacity>
            </View>
        </View>


    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    container1: {

        height: '70%',
        width: '100%',
        position: 'absolute',
        top:'25%'
    },
    background: {
        width: '100%',
        borderRadius: 30,
        marginTop: '-158%'
    },

    Welcome: {
        fontSize: 20,
        position: 'absolute',
        top: 130,
        color: 'white'
    },
    logo: {
        position: 'absolute',
        top: 10,
        height: '20%',
        resizeMode: "contain",

        marginRight: 'auto'

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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationText: {
        fontSize: 12,
        color: 'white'
    }

})

export default DailyList;