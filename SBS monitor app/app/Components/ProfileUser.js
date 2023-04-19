import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
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

const ProfileUser = ({ ProfUser }) => {

    const [newProfile, setnewProfile] = useState(ProfUser);


    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(false);
    const [FirstName, setFirstName] = useState(ProfUser.FirstName);
    const [LastName, setLastName] = useState(ProfUser.LastName);
    const [Email, setEmail] = useState(ProfUser.Email);
    const [Password, setPassword] = useState('');
    const [Phone, setPhone] = useState(ProfUser.Phone);

    const [success, setSuccess] = useState(false);


    const Name = require('../assets/Name.png');

    const Emai = require('../assets/Email.png');
    const Phon = require('../assets/Phone.png');

    const PSW = require('../assets/PSW.png');
    const Edit = require('../assets/Edit.png');










    const handleSave = () => {
        const updatedUser = {
            _id: ProfUser._id,
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Phone: Phone

        };

        axios.put(`${baseURL}/user/updateUser/${ProfUser._id}`, updatedUser)
            .then(res => {
                console.log(res);
                setnewProfile(updatedUser);
                navigation.navigate('Home');

            })
            .catch(error => console.error(error));

        setIsEditing(false);
        alert("User updated successfully!");
        setSuccess(true);
    };



    return (
        <View >

            {isEditing ? (
                <>
                    <Image style={styles.Editicon} source={Edit} />
                    <Text style={styles.title1} >  FirstName </Text>
                    <TextInput
                    
                        style={styles.input}
                        value={FirstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder={ProfUser.FirstName}
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                     <Image style={styles.Editicon1} source={Edit} />
                    <Text style={styles.title1} >  LastName </Text>
                   
                    <TextInput
                        style={styles.input}
                        value={LastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder={ProfUser.LastName}
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Image style={styles.Editicon2} source={Edit} />
                    <Text style={styles.title1} >  Email </Text>
                    <TextInput
                        style={styles.input}
                        value={Email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder={ProfUser.Email}
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Image style={styles.Editicon3} source={Edit} />
                    <Text style={styles.title1} >  Password </Text>
                    <TextInput
                        style={styles.input}

                        onChangeText={(text) => setPassword(text)}
                        placeholder='******'
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry
                    />
                    <Image style={styles.Editicon4} source={Edit} />
                    <Text style={styles.title1} >  Phone </Text>
                    <TextInput
                        style={styles.input}
                        value={Phone}
                        onChangeText={setPhone}
                        placeholder={`${ProfUser.Phone}`}
                        keyboardType="phone-pad"

                    />



                    <TouchableOpacity style={styles.Button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>


                </>
            )
                : success ? (
                    <>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={Name} />
                            <Text style={styles.label} > FirstName</Text>
                            <Text style={styles.label1}>{newProfile.FirstName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={Name} />
                            <Text style={styles.label} > LastName</Text>
                            <Text style={styles.label1}>{newProfile.LastName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={Emai} />
                            <Text style={styles.label} > Email</Text>
                            <Text style={styles.label1}>{newProfile.Email}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={PSW} />
                            <Text style={styles.label} > Password</Text>
                            <Text style={styles.label1}>******</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                            <Image style={styles.logo} source={Phon} />
                            <Text style={styles.label} > Phone</Text>
                            <Text style={styles.label1}>{newProfile.Phone}</Text>
                        </TouchableOpacity>

                    </>
                )
                    : (
                        <>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={Name} />
                                <Text style={styles.label} > FirstName</Text>
                                <Text style={styles.label1}>{ProfUser.FirstName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={Name} />
                                <Text style={styles.label} > LastName</Text>
                                <Text style={styles.label1}>{ProfUser.LastName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={Emai} />
                                <Text style={styles.label} > Email</Text>
                                <Text style={styles.label1}>{ProfUser.Email}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={PSW} />
                                <Text style={styles.label} > Password</Text>
                                <Text style={styles.label1}>******</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsEditing(true)} >
                                <Image style={styles.logo} source={Phon} />
                                <Text style={styles.label} > Phone</Text>
                                <Text style={styles.label1}>{ProfUser.Phone}</Text>
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
        color: '#234b9a'
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
    },
    Editicon: {
        width: 60,
        resizeMode: "contain",
        position: 'absolute',
        top: -25,
        left: 50
    },
    Editicon1: {
        width: 60,
        resizeMode: "contain",
        position: 'absolute',
       top:'13%',
        left: 50
    },
    Editicon2: {
        width: 60,
        resizeMode: "contain",
        position: 'absolute',
       top:'29%',
        left: 50
    }, 
    Editicon3: {
        width: 60,
        resizeMode: "contain",
        position: 'absolute',
       top:'45%',
        left: 50
    },
    Editicon4: {
        width: 60,
        resizeMode: "contain",
        position: 'absolute',
       top:'62%',
        left: 50
    }


})

export default ProfileUser