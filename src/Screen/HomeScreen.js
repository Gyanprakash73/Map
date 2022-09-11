import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation, route}) => {
  const {Data} = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnView}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BottomScreen1', {Data})}>
        <Text style={styles.btnText}>Bottom1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnView}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BottomScreen2', {Data})}>
        <Text style={styles.btnText}>Bottom2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnView}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BottomScreen3', {Data})}>
        <Text style={styles.btnText}>Bottom3</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 100,
  },
  btnView: {
    backgroundColor: '#F19545',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
