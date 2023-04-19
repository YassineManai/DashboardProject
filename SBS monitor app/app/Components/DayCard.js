import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DayCard = ({ Dsheet }) => {
    const navigation = useNavigation();
    const myDate = new Date( Dsheet.date);
    const formattedDate = myDate.toLocaleDateString('en-CA', { weekday: 'long' });
   
    const handleDailySheetClick = () => {
      navigation.navigate('Daily', { id: Dsheet._id, DateCart: formattedDate });
    };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
      {Dsheet.TypeJ =="Working" ? (
              <Image source={require('../assets/icon2.png')} style={styles.image} />
            ) : Dsheet.TypeJ =="DayOff" ?(
              <Image source={require('../assets/icon1.png')} style={styles.image} />
            ) : Dsheet.TypeJ =="Holiday" ? (
              <Image source={require('../assets/icon3.png')} style={styles.image} />
            ) : null }
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
          <Text style={styles.title}>{new Date(Dsheet.date).toLocaleDateString('en-CA', { weekday: 'long' })}</Text>
    
          </View>
         
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDailySheetClick}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  image: {
    width:'100%',
    height: 100,
    resizeMode: "contain"
  },
  cardContent: {
    flex: 5,
    paddingLeft: 10,
    justifyContent: 'space-between',
    
  },
  cardHeader: {
   
 
    alignItems: 'center',
    marginTop:30,
   
  
   
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color:'#234b9a',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
   
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#234b9a'
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    backgroundColor: '#234b9a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

})

export default DayCard