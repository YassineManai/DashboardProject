import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Buttonn, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';


import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCallback } from 'react';


const HomeScreen = () => {

  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();
  const myImage = require('../assets/sbs.png');
  const Home = require('../assets/Homeactive.png');
  const Dsheet = require('../assets/ADsheet!active.png');
  const OffDay = require('../assets/offdayactive.png');
  const Msheet = require('../assets/Dsheet!acive.png');
  const Profile = require('../assets/Profile!active.png');
  const background = require('../assets/BACKGROUD.png');
  const User = require('../assets/HomeUser.png');
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const userToken = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(userToken);
        setUserId(decodedToken._id);
        setUsername(decodedToken.FirstName);

      }
      fetchData();

    }, [])
  );


  console.log(username)
  console.log(userId)


  const handleLogout = () => {
   
    AsyncStorage.removeItem('userToken').then(() => {
      navigation.navigate('Login');
    });
    console.log('haloo')
  };



  return (
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      <Image style={styles.logo} source={myImage} />
      <TouchableOpacity onPress={() => handleLogout()}>
        <Image source={require('../assets/logoutnew.png')} style={styles.detailIcon} />
      </TouchableOpacity>

      <Text style={styles.Welcome}> Welcome  {username} </Text>

      <Image style={styles.User} source={User} />

      <TouchableOpacity style={styles.pickerContainer}  >
        <Text style={styles.label} > Welcome to the SBS Applicatoin , here you can track your performance during your work period at SBS and keep track of company information.</Text>
       
      </TouchableOpacity>







      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navigationItem}>
          <Image style={styles.icon} source={Home} />
          <Text style={styles.navigationText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DailySheet', { userId: userId })} style={styles.navigationItem}>
          <Image style={styles.icon1} source={Dsheet} />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OffDay', { userId: userId })} style={styles.navigationItem} >
          <Image style={styles.icon1} source={OffDay} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MonthlySheet')} style={styles.navigationItem} >
          <Image style={styles.icon1} source={Msheet} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navigationItem} >
          <Image style={styles.icon1} source={Profile} />
        </TouchableOpacity>
      </View>
    </View>


  );

}


const styles = StyleSheet.create({
  label1: {
    color: '#234b9a'
},
label: {
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    marginBottom: 5,
    color: 'black'
},
  pickerContainer: {
    position:'absolute',
    top:'60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
   
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
  detailIcon: {
    position: 'absolute',
    resizeMode: "contain",
    top: -140,
    left: 100,
    zIndex: 1,
    height: 50,
    width: 60,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  background: {
    width: '100%',
    borderRadius: 30,
    marginTop: '-158%'
  },
  Welcome: {
    fontSize: 20,
    position: 'absolute',
    top: 90,
    color: 'white'
  },
  logo: {
    position: 'absolute',
    height: '6%',
    resizeMode: "contain",
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
  User: {
    position: 'absolute',
    top: 180,
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
  }

})

export default HomeScreen;