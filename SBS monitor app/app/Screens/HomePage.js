import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Buttonn, ScrollView } from 'react-native';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MonthCard from '../Components/MonthCard';
import { useCallback } from 'react';

const HomeScreen = () => {

  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [monthlySheet, setMonthlySheet] = useState([]);



  const navigation = useNavigation();

  const myImage = require('../assets/sbs.png');

  const [year, setYear] = useState(new Date().getFullYear());

  const years = Array.from({ length: 50 }, (v, i) => new Date().getFullYear() - i);

  const handleSelect = (value) => {
    setYear(value);
  };


  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const userToken = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(userToken);
        setUserId(decodedToken._id);
        setUsername(decodedToken.FirstName);
        fetchMonthlySheet(decodedToken._id);
      }
      fetchData();
      fetchMonthlySheet(userId);
    }, [userId, year])
  );


  const fetchMonthlySheet = async (id) => {
    try {
      const response = await axios.get(`http://192.168.1.16:3000/monthlysheet/allMonthlySheet/${id}`);
      const data = response.data;
      const filteredData = data.filter((task) => task.Year == year);
      setMonthlySheet(filteredData);
      console.log(filteredData)
    } catch (error) {
      console.error(error);
    }
  };
  console.log(username)
  console.log(userId)

  const checkUserToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    console.log(userToken)
    if (!userToken) {
      navigation.navigate('Login');
    }
  }

  useEffect(() => {
    checkUserToken();
  }, []);



  const listMsheet = monthlySheet.map((Msheet) => (
    <MonthCard key={Msheet._id} Msheet={Msheet} />
  ));


  const handleLogout = () => {
    // Clear the user token and navigate to the Login screen
    // Here's an example of how you could clear the token using AsyncStorage:
    AsyncStorage.removeItem('userToken').then(() => {
      navigation.navigate('Login');
    });
  };


  navigation.setOptions({
    title: 'SBS Monitor',
    headerStyle: {
      backgroundColor: 'white',
      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color:'black'
    },
    headerRight: () => (
      <TouchableOpacity onPress={() => handleLogout()}>
        <Image source={require('../assets/Logout.png')} style={styles.detailIcon} />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={myImage} />
      <Text style={styles.label}>Select Year:</Text>
      <Picker
        selectedValue={year}
        onValueChange={handleSelect}
        style={styles.picker}
      >
        {years.map((year) => (
          <Picker.Item key={year} label={year.toString()} value={year} />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.ButtonA}
        onPress={() => navigation.navigate('DailySheet', { userId: userId })}
      >
        <Text style={styles.buttonText}>Add DailySheet</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.ButtonB}
        onPress={() => navigation.navigate('OffDay')}
      >
        <Text style={styles.buttonText}>Add Congé</Text>
      </TouchableOpacity>


      <View style={styles.container1}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {listMsheet}
        </ScrollView>
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
  ButtonA: {
    backgroundColor: '#234b9a',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    width: 300,
    height: 49,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    top: 60

  },
  logo: {

    height: '6%',
    resizeMode: "contain",
    position: 'absolute',
    top: 10,
    right: 20
  },
  ButtonB: {
    backgroundColor: '#234b9a',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    width: 300,
    height: 49,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    top: 130


  },
  buttonText: {
    color: '#dfdeee',
    fontSize: 16,

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',

    color: 'white',
    position: 'absolute',
    top: 4,
    right: 10,
  },
  picker: {
    position: 'absolute',
    width: '30%',
    height: 20,
    borderRadius: 5,
    top: 22,
    right: -10,
    color: 'black',
    backgroundColor: 'white',
    
  },


  container1: {

    height: 500,
    width: '100%',
    position: 'absolute',
    top: 200
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    margin: 10
  },

})

export default HomeScreen;