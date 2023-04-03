import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';

import { useCallback } from 'react';
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
  const [monthlySheet, setMonthlySheet] = useState([]);

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

  

  const handleSubmit =  () => {


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
          navigation.navigate('Home');

        }, 2000);

      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred, please try again');
      });
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
      
      <ScrollView >
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
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
          <Text style={styles.label} >finishTime</Text>
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
          style={styles.inputpicker}
          selectedValue={selectedProject}
          onValueChange={handleProjectChange}
          dropdownIconColor="#234b9a"
          dropdownIconName={dropdownIcon}>
          <Picker.Item label='Select Project' value='' />
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

        <Text style={styles.title} >  Trasport </Text>
        <Picker
          style={styles.inputpicker}
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
      
     
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0d101b',
    color: 'white'

  },
  label1: {
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingLeft: '35%',
    paddingTop: 10,
    color: '#234b9a'
  },
  inputpicker: {
    width: 190,
    marginLeft: '25%',
    color: 'white',

  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#234b9a'
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white'

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
    marginLeft: '9%'

  },
  buttonText: {
    color: '#dfdeee',
    fontSize: 16,

  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    color: 'white'
  },
  successContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    width: 200,
    height: 50,
    top: '40%',
    left:'30%',
    zIndex: 1,

    alignItems: 'center'
  },
  
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default DailySheet