import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MonthCard = ({ Msheet }) => {
    const navigation = useNavigation();

    const handleDailySheetClick = () => {
      navigation.navigate('DailyList', { id: Msheet._id, month: Msheet.Month, year: Msheet.Year });
    };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/calender.png')} style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{Msheet.Month}</Text>
            {Msheet.Status ? (
              <Image source={require('../assets/valideS.png')} style={styles.detailIcon} />
            ) : (
              <Image source={require('../assets/refuseS.png')} style={styles.detailIcon} />
            )}
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Image source={require('../assets/icon2.png')} style={styles.detailIcon} />
              <Text style={styles.detailText}>{Msheet.NbrJTrav}</Text>
              <Text style={styles.detailLabel}>Works</Text>
            </View>
            <View style={styles.detailItem}>
              <Image source={require('../assets/icon1.png')} style={styles.detailIcon} />
              <Text style={styles.detailText}>{Msheet.NbrJConge}</Text>
              <Text style={styles.detailLabel}>DayOffs</Text>
            </View>
            <View style={styles.detailItem}>
              <Image source={require('../assets/icon3.png')} style={styles.detailIcon} />
              <Text style={styles.detailText}>{Msheet.NbrJFeries}</Text>
              <Text style={styles.detailLabel}>Holidays</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    margin:10
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

export default MonthCard