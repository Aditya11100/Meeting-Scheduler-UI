/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalSheet from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const schedules = [
    {title: 'Meeting_1', fromTime: '09:00 am', toTime: '12:00 pm'},
    {title: 'Meeting_2', fromTime: '02:00 pm', toTime: '02:20 pm'},
    {title: 'Meeting_3', fromTime: '03:15 pm', toTime: '03:30 pm'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.buttonStyle}>
          <Text
            style={{
              paddingVertical: 15,
              color: '#FFFFFF',
              fontSize: 17,
              textAlign: 'center',
              fontWeight: '400',
            }}>
            {'Show Day View'}
          </Text>
        </TouchableOpacity>
        <ModalSheet
          showModal={showModal}
          setShowModal={setShowModal}
          schedules={schedules}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 19,
  },
  buttonStyle: {
    backgroundColor: '#03878F',
    borderRadius: 6,
    width: '100%',
  },
});

export default App;
