/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalSheet from './components/Modal';
import OtpInput from './components/OTP';
import FormElement, {KEYBOARD_TYPE} from './components/FormElements';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const fieldRef = useRef();

  const [schedules, setSchedules] = useState([
    {title: 'Meeting_1', fromTime: '09:00 AM', toTime: '09:40 AM'},
    {title: 'Meeting_2', fromTime: '02:00 PM', toTime: '02:20 PM'},
    {title: 'Meeting_3', fromTime: '03:15 PM', toTime: '03:30 PM'},
  ]);
  const [timings, setTimings] = useState([
    ['09:00 AM', '09:40 AM'],
    ['02:00 PM', '02:20 PM'],
    ['03:15 PM', '03:30 PM'],
  ]);

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
          setSchedules={setSchedules}
          timings={timings}
          setTimings={setTimings}
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
