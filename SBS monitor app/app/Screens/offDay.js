import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView, Radio } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';



import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

const OffDay = ({ route }) => {
  const navigation = useNavigation();
  const Home = require('../assets/Home!active.png');
  const Dsheet = require('../assets/ADsheet!active.png');
  const OffDay = require('../assets/offday!active.png');
  const Msheet = require('../assets/Dsheet!acive.png');
  const Profile = require('../assets/Profile!active.png');
  const background = require('../assets/BACKGROUD.png');
  const Add = require('../assets/Adddaily.png');


  const { userId } = route.params;
  console.log(userId)

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState(new Date());
  console.log(date.toLocaleDateString('en-CA'))
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const handleConfirm = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };



  const handleSubmit = () => {


    // Make API request
    axios.post(`http://192.168.1.16:3000/dailysheet/CreateDailySheeto/${userId}`, {
      date: date.toLocaleDateString('en-CA'),
      TypeJ: TypeJ,
      Timed: "0",
      TimeF: "0",
    }, {
      headers: {
        Authorization: `Bearer ${AsyncStorage.getItem('token')}` // Include user token in header
      }
    })
      .then((response) => {
        console.log('Task saved');

        console.log(response);


        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          navigation.navigate('MonthlySheet');

        }, 2000);

      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred, please try again');
      });
  }

  const [TypeJ, setTypeJ] = useState('');
  console.log(TypeJ)
  const handleOptionChange = (value) => {
    setTypeJ(value);
  };


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
          ADD OffDay
        </Text>
      </View>
    ),

  });
  return (


    <View style={styles.container} >

      {success && (

        <View style={styles.successContainer}>
          <Text style={styles.successText}>Task saved</Text>
        </View>


      )}
      {success == false && (


        <ScrollView  >
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}
          <Image style={styles.background} source={background} />
          <Image style={styles.logo} source={Add} />
          <TouchableOpacity onPress={showDatePicker} style={styles.pickerContainer} >
            <Text style={styles.label} >Pickup Date</Text>
            <Text style={styles.label1}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}

            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />



          <TouchableOpacity
            style={TypeJ == "Congé" ? styles.radioSelected : styles.radio}
            onPress={() => handleOptionChange("Congé")}

          >
            <Text style={styles.radioLabel}>Congé</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={TypeJ == "Férié" ? styles.radioSelected : styles.radio}
            onPress={() => handleOptionChange("Férié")}
          >
            <Text style={styles.radioLabel}>Férié</Text>
          </TouchableOpacity>



          <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>



        </ScrollView>



      )}




      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.icon1} source={Home} />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DailySheet', { userId: userId })} style={styles.navigationItem}>
          <Image style={styles.icon1} source={Dsheet} />

        </TouchableOpacity>
        <TouchableOpacity  style={styles.navigationItem} >
          <Image style={styles.icon} source={OffDay} />
          <Text style={styles.navigationText}>OffDay</Text>

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
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    marginLeft: '35%',

  },
  radioSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    marginLeft: '35%',

  },
  radioLabel: {
    marginLeft: 15,
  },
  container: {
    flex: 1,

    backgroundColor: 'white',
    height: '100%'


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
    marginBottom: 40
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
    marginBottom: 20,
    marginTop: -25


  },

})




export default OffDay