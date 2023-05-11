import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/Screens/Login';
import SignUpScreen from './app/Screens/Signup';
import HomeScreen from './app/Screens/Home';
const Stack = createStackNavigator();
import axios from 'axios';
import { useEffect } from 'react';
import DailySheet from './app/Screens/AddDailySheet';
import OffDay from './app/Screens/offDay';
import MonthlySheet from './app/Screens/Monthlysheet';
import Dailylist from './app/Screens/Dailylist';
import OneDailySheet from './app/Screens/DailySheet';
import Profile from './app/Screens/Profile';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ResetScreen from './app/Screens/Reset_Password';
import { baseURL } from './Config';
const App = () => {
  


  const fetchApi = async () => {
    try {
      const res = await axios.get(`${baseURL}/`);
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchApi();
  }, [])





  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
           
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  SBS Monitor
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Reset"
          component={ResetScreen}
          options={{
           
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  SBS Monitor
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{
            headerStyle: {
              backgroundColor: 'white',
            },
         
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: 'black', fontSize: 20 }}>
                 Create Account
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#234b9a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  SBS Monitor
                </Text>
              </View>
            ),
           
          }}
        />
        <Stack.Screen
          name="DailySheet"
          component={DailySheet}
          options={{
            headerStyle: {
              backgroundColor: '#234b9a',
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
          }}
        />
        <Stack.Screen
          name="MonthlySheet"
          component={MonthlySheet}
          options={{
            headerStyle: {
              backgroundColor: '#234b9a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  List of MonthlySheet
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="DailyList"
          component={Dailylist}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#234b9a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  DailyList of {route.params.month} {route.params.year}
                </Text>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Daily"
          component={OneDailySheet}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#234b9a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  {route.params.DateCart}
                </Text>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="OffDay"
          component={OffDay}
          options={{
            headerStyle: {
              backgroundColor: '#234b9a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  ADD Day OFF
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: '#234b9a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />





      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default App;