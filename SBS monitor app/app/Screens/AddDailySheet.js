import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';

import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';



const DailySheet = ({ route }) => {
 
  const dropdownIcon = () => (
    <Icon name="keyboard-arrow-down" size={24} color="gray" />
  );


  const [date, setDate] = useState(new Date());
  console.log(date.toLocaleDateString('en-CA'))
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStimePickerVisible, setStimePickerVisibility] = useState(false);
  const [isFtimePickerVisible, setFtimePickerVisibility] = useState(false);
 

  const [location, setLocation] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [pickupPlace, setPickupPlace] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());
  const [vehiclePrice, setVehiclePrice] = useState('');
  const [task, setTask] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const Home = require('../assets/Home!active.png');
  const Dsheet = require('../assets/ADsheetactive.png');
  const OffDay = require('../assets/offdayactive.png');
  const Msheet = require('../assets/Dsheet!acive.png');
  const Profile = require('../assets/Profile!active.png');
  const background = require('../assets/BACKGROUD.png');
  const Add = require('../assets/Adddaily.png');

  const handleProjectChange = (itemValue, itemIndex) => {
    setSelectedProject(itemValue);
  };

  const handlePickupPlaceChange = (itemValue, itemIndex) => {
    setPickupPlace(itemValue);
  };

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


  const showStimePicker = () => {
    setStimePickerVisibility(true);
  };

  const hideStimePicker = () => {
    setStimePickerVisibility(false);
  };

  const showFtimePicker = () => {
    setFtimePickerVisibility(true);
  };

  const hideFtimePicker = () => {
    setFtimePickerVisibility(false);
  };




  const handleStimeConfirm = (selectedTime) => {
    const currentTime = selectedTime || startTime;
    setStartTime(currentTime);
    hideStimePicker();
  };

  const handleFtimeConfirm = (selectedTime) => {
    const currentTime = selectedTime || startTime;
    setFinishTime(currentTime);
    hideFtimePicker();
  };


  console.log(startTime.toLocaleTimeString())
  console.log(finishTime.toLocaleTimeString())



  console.log(selectedProject)


  const { userId } = route.params;
  console.log(userId)



  const [Projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get('http://192.168.1.16:3000/project/allprojects')
      .then((res) => {
        const filteredProjects = res.data.filter(project => project.Status === false);
        setProjects(filteredProjects);

      })
      .catch(error => console.error(error));
  }, []);



  const handleSubmit = () => {


    // Make API request
    axios.post(`http://192.168.1.16:3000/dailysheet/CreateDailySheet/${userId}`, {
      date: date.toLocaleDateString('en-CA'),
      TypeJ: 'travail',
      ProjectName: selectedProject,
      Task: task,
      Timed: startTime.toLocaleTimeString(),
      TimeF: finishTime.toLocaleTimeString(),
      Location: location,
      VehiclePrice: vehiclePrice,
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


  navigation.setOptions({
    headerStyle: {
   backgroundColor:'#234b9a'
     
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
    headerTitle: () => (
      <View>
        <Text style={{ color: '#fff', fontSize: 20 }}>
          ADD DailySheet
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
            <Text style={styles.label} >Pickup Date/Time</Text>
            <Text style={styles.label1}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}

            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />


          <TouchableOpacity onPress={showStimePicker} style={styles.pickerContainer} >
            <Text style={styles.label} >Start Time</Text>
            <Text style={styles.label1} >{startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isStimePickerVisible}

            mode="time"
            onConfirm={handleStimeConfirm}
            onCancel={hideStimePicker}
          />


          <TouchableOpacity onPress={showFtimePicker} style={styles.pickerContainer} >
            <Text style={styles.label} >FinishTime</Text>
            <Text style={styles.label1}>{finishTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isFtimePickerVisible}

            mode="time"
            onConfirm={handleFtimeConfirm}
            onCancel={hideFtimePicker}
          />




          <Text style={styles.title}>Select Project</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={selectedProject}
            onValueChange={handleProjectChange}
            dropdownIconColor="#234b9a"
            dropdownIconName={dropdownIcon}>
            <Picker.Item label='List Projects' value='' />
            {/* Projects array is mapped to generate Picker Items */}
            {Projects.map((project) => (
              <Picker.Item key={project._id} label={project.ProjectName} value={project.ProjectName} />
            ))}
          </Picker>




          <TextInput
            style={styles.input}
            value={location}
            onChangeText={(text) => setLocation(text)}
            placeholder="Location"
            autoCompleteType='off'
            autoCapitalize='none'
            autoCorrect={false}
          />

          <Text style={styles.title1} >  Trasport </Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={pickupPlace}
            onValueChange={handlePickupPlaceChange}
            dropdownIconColor="#234b9a"
            dropdownIconName={dropdownIcon}
          >
            <Picker.Item label='Select Transport' value='' disabled />
            <Picker.Item label='Taxi' value='office' />
            <Picker.Item label='Voiture Privé' value='town_hall' />
          </Picker>

          {pickupPlace === 'office' && (
            <TextInput
              style={styles.input}
              placeholder="Vehicle Price"
              autoCompleteType="off"
              onChangeText={(value) => setVehiclePrice(value)}
              value={vehiclePrice}
              name="vehicle_price"
              id="vehicle_price"
              keyboardType="numeric"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Task"
            autoCompleteType="off"
            onChangeText={(value) => setTask(value)}
            value={task}
            name="Task"
            id="Task"
          />
          <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>



        </ScrollView>



      )}

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
    marginBottom: 20,
    marginTop: -25


  },

})

export default DailySheet