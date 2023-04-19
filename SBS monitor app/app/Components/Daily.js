import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';

import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { baseURL } from '../../Config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

const Day = ({ Daysheet }) => {

    const [daysheet, setDaysheet] = useState(Daysheet);

    const dropdownIcon = () => (
        <Icon name="keyboard-arrow-down" size={24} color="gray" />
    );

    const navigation = useNavigation();
    const [isStimePickerVisible, setStimePickerVisibility] = useState(false);
    const [isFtimePickerVisible, setFtimePickerVisibility] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [location, setLocation] = useState(Daysheet.Location);
    const [selectedProject, setSelectedProject] = useState(Daysheet.ProjectName);
    const [pickupPlace, setPickupPlace] = useState('');
    const [startTime, setStartTime] = useState(Daysheet.Timed);

    const [finishTime, setFinishTime] = useState(Daysheet.TimeF);
    const [vehiclePrice, setVehiclePrice] = useState(Daysheet.VehiclePrice);
    const [task, setTask] = useState(Daysheet.Task);
    const [typeJ, setTypeJ] = useState(Daysheet.TypeJ);

    const [success, setSuccess] = useState(false);

    const brackets = require('../assets/brackets.png');


    const handleProjectChange = (itemValue, itemIndex) => {
        setSelectedProject(itemValue);
    };

    const handlePickupPlaceChange = (itemValue, itemIndex) => {
        setPickupPlace(itemValue);
    };
    const handleDayChange = (itemValue, itemIndex) => {
        setTypeJ(itemValue);
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

        setStartTime(selectedTime.toLocaleTimeString());
        hideStimePicker();
    };

    const handleFtimeConfirm = (selectedTime) => {

        setFinishTime(selectedTime.toLocaleTimeString());
        hideFtimePicker();
    };






    console.log(selectedProject)





    const [Projects, setProjects] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}/project/allprojects`)
            .then((res) => {
                const filteredProjects = res.data.filter(project => project.Status === false);
                setProjects(filteredProjects);

            })
            .catch(error => console.error(error));
    }, []);


    const handleSave = () => {
        const updatedDaySheet = {
            UserId: Daysheet.UserId,
            date: Daysheet.date,
            Monthlysheetid: Daysheet.Monthlysheetid,
            TypeJ: typeJ,
            Location: location,
            ProjectName: selectedProject,
            Timed: startTime,
            TimeF: finishTime,
            VehiclePrice: vehiclePrice,
            Task: task
        };

        axios.put(`${baseURL}/dailysheet/updateDay/${Daysheet._id}`, updatedDaySheet)
            .then(res => {
                console.log(res);
                setDaysheet(updatedDaySheet);
                navigation.navigate('MonthlySheet');

            })
            .catch(error => console.error(error));

        setIsEditing(false);
        alert("Day updated successfully!");
        setSuccess(true);
    };

console.log(typeJ)

    return (

        <View >

            {isEditing ? (
                <ScrollView>
                    <Text style={styles.title1} > Update Day Type </Text>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={typeJ}
                        onValueChange={handleDayChange}
                        dropdownIconColor="#234b9a"
                        dropdownIconName={dropdownIcon}
                    >
                        <Picker.Item label='Choose' value='' disabled />
                        <Picker.Item label='Working' value='Working' />
                        <Picker.Item label='DayOff' value='DayOff' />
                        <Picker.Item label='Holiday' value='Holiday' />
                    </Picker>

                    <TouchableOpacity onPress={showStimePicker} style={styles.pickerContainer} >
                        <Text style={styles.label} >Start Time</Text>
                        <Text style={styles.label1} >{startTime}</Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isStimePickerVisible}

                        mode="time"
                        onConfirm={handleStimeConfirm}
                        onCancel={hideStimePicker}
                    />


                    <TouchableOpacity onPress={showFtimePicker} style={styles.pickerContainer} >
                        <Text style={styles.label} >FinishTime</Text>
                        <Text style={styles.label1}>{finishTime}</Text>
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

                    <Text style={styles.title1} >  Location </Text>


                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={(text) => setLocation(text)}
                        placeholder={Daysheet.Location}
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
                    <Text style={styles.title1} >  Task </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={Daysheet.Task}
                        autoCompleteType="off"
                        onChangeText={(value) => setTask(value)}
                        value={task}
                        name="Task"
                        id="Task"
                    />
                    <TouchableOpacity style={styles.Button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>


                </ScrollView>
            )
                : success ? (
                    <>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > Day Type </Text>
                            <Text style={styles.label1}>{daysheet.TypeJ}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > Project</Text>
                            <Text style={styles.label1}>{daysheet.ProjectName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > Task</Text>
                            <Text style={styles.label1}>{daysheet.Task}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > startTime</Text>
                            <Text style={styles.label1}>{daysheet.Timed}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > startFinish</Text>
                            <Text style={styles.label1}>{daysheet.TimeF}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > VehiclePrice</Text>
                            <Text style={styles.label1}>{daysheet.VehiclePrice}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={brackets} />
                            <Text style={styles.label} > Location</Text>
                            <Text style={styles.label1}>{daysheet.Location}</Text>
                        </TouchableOpacity>
                    </>
                )
                    : (
                        <>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > Day Type</Text>
                                <Text style={styles.label1}>{Daysheet.TypeJ}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > Project</Text>
                                <Text style={styles.label1}>{Daysheet.ProjectName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > Task</Text>
                                <Text style={styles.label1}>{Daysheet.Task}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > startTime</Text>
                                <Text style={styles.label1}>{Daysheet.Timed}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > startFinish</Text>
                                <Text style={styles.label1}>{Daysheet.TimeF}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > VehiclePrice</Text>
                                <Text style={styles.label1}>{Daysheet.VehiclePrice}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={brackets} />
                                <Text style={styles.label} > Location</Text>
                                <Text style={styles.label1}>{Daysheet.Location}</Text>
                            </TouchableOpacity>
                        </>
                    )}

        </View>

    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300,
        height: 60,
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
    label1: {
        color: '#234b9a',

    },
    label: {
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        marginBottom: 5,
        color: 'black',
        marginLeft: 45
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
        width: 300,
        elevation: 3,


    },
    Button: {

        backgroundColor: '#234b9a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 20,
        width: 200,
        height: 49,
        alignItems: 'center',
        marginLeft: '15%',
        marginBottom: 70


    },

    buttonText: {
        color: '#dfdeee',
        fontSize: 16,
        textAlign: 'center'

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
        width: 300,
        alignItems: 'center'


    },
    pickerItem: {
        fontSize: 16,
        color: '#234b9a',
        textAlign: 'center',
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
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#234b9a'
    },
    logo: {
        width: 30,
        resizeMode: "contain",
        position: 'absolute',
        left: 10
    }

})

export default Day