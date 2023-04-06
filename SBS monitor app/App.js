import React from 'react';
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
const App = () => {

 

  const fetchApi = async () => {
    try {
      const res = await axios.get('http://192.168.1.16:3000/');
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
        
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DailySheet" component={DailySheet} />
        <Stack.Screen name="MonthlySheet" component={MonthlySheet} />
        <Stack.Screen name="DailyList" component={Dailylist} />
        <Stack.Screen name="Daily" component={OneDailySheet} />
        <Stack.Screen name="OffDay" component={OffDay} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;