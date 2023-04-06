import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import Day from '../Components/Daily';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';



const OneDailySheet = ({ route }) => {




    const Home = require('../assets/Home!active.png');
    const Dsheet = require('../assets/ADsheetactive.png');
    const OffDay = require('../assets/offdayactive.png');
    const Msheet = require('../assets/Dsheet!acive.png');
    const Profile = require('../assets/Profile!active.png');
    const background = require('../assets/BACKGROUD.png');
    const Add = require('../assets/Adddaily.png');







    const navigation = useNavigation();


    const { id } = route.params;
    const { DateCart } = route.params
    const myDate = new Date(DateCart);
    const formattedDate = myDate.toLocaleDateString('en-CA', { weekday: 'long' });
    console.log(id)
    console.log(formattedDate)

    navigation.setOptions({
        headerStyle: {
            backgroundColor: '#234b9a'

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
            <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  {formattedDate}
                </Text>
            </View>
        ),

    });




    const [Daily, setDaily] = useState([]);




    useEffect(() => {

        fetchDaily(id);
    }, [])



    const fetchDaily = async (id) => {
        try {
            const response = await axios.get(`http://192.168.1.16:3000/dailysheet/Daily/${id}`);
            const data = response.data;
            setDaily(data);
            console.log(Daily)
        } catch (error) {
            console.error(error);
        }
    };
    const OneDay = Daily.map((Daysheet) => (
        <Day key={Daysheet._id} Daysheet={Daysheet} />
    ));


    return (

        <View style={styles.container} >






            <Image style={styles.background} source={background} />
            <Image style={styles.logo} source={Add} />

            <View style={styles.container1}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {OneDay}
                </ScrollView>
            </View>






            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.icon1} source={Home} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationItem}>
                    <Image style={styles.icon} source={Dsheet} />
                    <Text style={styles.navigationText}>Dsheet</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('OffDay', { userId: userId })} style={styles.navigationItem} >
                    <Image style={styles.icon1} source={OffDay} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MonthlySheet')} style={styles.navigationItem} >
                    <Image style={styles.icon1} source={Msheet} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Screen3')} style={styles.navigationItem} >
                    <Image style={styles.icon1} source={Profile} />
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({

    container1: {
        height: '65%',
        width: '100%',
        position: 'absolute',
        top:'25%'
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
    logo: {

        height: '10%',
        resizeMode: "contain",

        marginLeft: -133,
        marginRight: 'auto'

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
        height: 170,
        resizeMode: "contain",
        position: 'absolute',
        top: 20,
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
        width: '100%',
        borderRadius: 30,
        marginTop: '-158%'
    },


})

export default OneDailySheet