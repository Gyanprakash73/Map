import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

const BottomScreen3 = ({route}) => {
  const {Data} = route.params;

  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        style={styles.map}>
        {Data.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.Latitude,
              longitude: item.Longitude,
            }}
            title={item.LocationName}
            // description={'address'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BottomScreen3;
