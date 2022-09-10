import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BottomScreen1 = ({route}) => {
  const {Data} = route.params;

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
      <FlatList
        data={Data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BottomScreen1;
