import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  LogBox,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const BottomScreen2 = ({route}) => {
  const {Data} = route.params;
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [indicies, setIndicies] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        calculateLatLong(currentLatitude, currentLongitude);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  function calculateLatLong(cLat, cLong) {
    Data.map(item => {
      distance(cLat, cLong, item.Latitude, item.Longitude, item);
    });
  }

  function distance(lat1, lon1, lat2, lon2, item) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    newSortedData(dist, item);
    // dist = dist * 0.8684
    return dist;
  }

  function newSortedData(dist, item) {
    item.Distance = dist;
    indicies.push(item);
    indicies.sort((a, b) => a.Distance - b.Distance);
    setIndicies(indicies);
    setSpinner(false);
  }

  const _renderItem = ({item}) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.titleTextStyle}>
          LocationName :{'  '}
          <Text style={styles.textStyle}>{item.LocationName}</Text>
        </Text>
        <Text style={styles.titleTextStyle}>
          Longitude :{'  '}
          <Text style={styles.textStyle}>{item.Longitude}</Text>
        </Text>
        <Text style={styles.titleTextStyle}>
          Latitude :{'  '}
          <Text style={styles.textStyle}>{item.Latitude}</Text>
        </Text>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {spinner ? (
        <ActivityIndicator size="large" style={styles.progressBar} />
      ) : (
        <FlatList
          data={indicies}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  itemView: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  titleTextStyle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'normal',
  },
  line: {
    height: 1,
    backgroundColor: '#4f4f4f',
  },
});

export default BottomScreen2;
