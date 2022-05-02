/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {differenceFinder} from '../../helpers';
import DateTimePicker from '../DateTimePicker';
import moment from 'moment';
interface propsType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  schedules: {title: string; fromTime: string; toTime: string}[];
  setSchedules: React.Dispatch<
    React.SetStateAction<{title: string; fromTime: string; toTime: string}[]>
  >;
  timings: string[][];
  setTimings: React.Dispatch<React.SetStateAction<string[][]>>;
}

const ModalSheet = ({
  showModal,
  setShowModal,
  schedules,
  setSchedules,
  timings,
  setTimings,
}: propsType) => {
  const [meetings, setMeetings] = useState({
    '09': null,
    '10': null,
    '11': null,
    '12': null,
    '01': null,
    '02': null,
    '03': null,
    '04': null,
    '05': null,
    '06': null,
    '07': null,
    '08': null,
  });
  const [showPickerFrom, setShowPickerFrom] = useState(false);
  const [showPickerTo, setShowPickerTo] = useState(false);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const minTime = moment('09:00 AM', 'LT');
  const maxTime = moment('08:00 PM', 'LT');

  const time = [
    '09 am',
    '10 am',
    '11 am',
    '12 pm',
    '01 pm',
    '02 pm',
    '03 pm',
    '04 pm',
    '05 pm',
    '06 pm',
    '07 pm',
    '08 pm',
  ];

  useEffect(() => {
    let meet = meetings;
    schedules.map(item => {
      const str = item.fromTime.substring(0, 2);
      meet = {
        ...meet,
        [str]: item,
        // meetings[item.fromTime.substring(0, 2)]:item
      };
    });
    setMeetings(meet);
  }, [schedules]);

  useEffect(() => {
    if (fromTime && toTime) {
      if (
        minTime.isAfter(moment(fromTime, 'LT')) ||
        maxTime.isBefore(moment(toTime, 'LT'))
      ) {
        Alert.alert('Reselect Time', 'Time should be between 9am to 8pm', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setFromTime('');
        setToTime('');
      }
    }
  }, [fromTime, toTime]);

  const addtoSchedule = () => {
    if (fromTime && toTime) {
      const startTime = moment(fromTime, 'LT').format('LT');
      const endTime = moment(toTime, 'LT').format('LT');
      let canSchedule = true;
      // eslint-disable-next-line no-lone-blocks
      for (let i = 0; i < timings.length; i++) {
        const [a, b] = timings[i];
        const meetA = moment(a, 'LT').format('LT');
        const meetb = moment(b, 'LT').format('LT');

        // if (startTime < minTime || maxTime < endTime) {
        //   Alert.alert('Reselect Time', 'Time should be between 9 AM to 8 Pm', [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]);
        //   canSchedule = false;
        //   return;
        // }
        if (
          (startTime >= meetA &&
            startTime <= meetb &&
            endTime >= meetA &&
            endTime <= meetb) ||
          (startTime >= meetA && startTime <= meetb) ||
          (endTime > meetA && endTime < meetb) ||
          (startTime <= meetA && meetb <= endTime)
        ) {
          canSchedule = false;
          break;
        }
      }
      if (canSchedule) {
        setSchedules([
          ...schedules,
          {title: 'new meet', fromTime: fromTime, toTime: toTime},
        ]);
        setTimings([...timings, [fromTime, toTime]]);
        setFromTime('');
        setToTime('');
      } else {
        Alert.alert('Reselect Time', 'Time should not Overlab any meeting', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={showModal}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        // setShowModal(false);
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#000000',
          opacity: 0.8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingLeft: 23,
            paddingRight: 37,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/back.png')}
              style={{width: 30, height: 30}}
            />
            <Text
              style={{
                marginLeft: 8,
                color: '#FFFFFF',
                fontSize: 16,
              }}>
              {'When'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={{color: '#FFFFFF', fontSize: 16}}>{'Cancel'}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 11,
            height: '77%',
            width: '92%',
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
          }}>
          <View style={{height: '88%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 31,
              }}>
              <Image source={require('../../assets/Vector.png')} />
              <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 11}}>
                {'January, 1st 2020'}
              </Text>
            </View>
            <View>
              <ScrollView
                style={{marginTop: 34, marginLeft: 15, marginBottom: 34}}>
                {time.map(item => {
                  // const difference = differenceFinder(
                  //   meetings[item.substring(0, 2)]?.fromTime,
                  //   meetings[item.substring(0, 2)]?.toTime,
                  // );
                  let from = moment(
                    meetings[item.substring(0, 2)]?.fromTime,
                    'LT',
                  ).format('LT');
                  let to = moment(
                    meetings[item.substring(0, 2)]?.toTime,
                    'LT',
                  ).format('LT');
                  let height = moment(to, 'LT').diff(
                    moment(from, 'LT'),
                    'minutes',
                  );
                  let diff = Math.floor(height / 60);
                  diff = diff * 100;
                  height = height % 60;
                  height = Math.floor((height / 60) * 100);
                  diff = diff + height;
                  // let height =
                  //   (parseInt(
                  //     meetings[item.substring(0, 2)]?.toTime.substring(3, 5),
                  //   ) /
                  //     60) *
                  //   100;
                  let margintop =
                    (parseInt(
                      meetings[item.substring(0, 2)]?.fromTime.substring(3, 5),
                    ) /
                      60) *
                    100;
                  margintop = margintop / 2;
                  // height === 0 ? (height = 100) : null;
                  // height = height + difference;
                  return (
                    <View style={{height: 60, flexDirection: 'row'}}>
                      <Text style={{color: '#B95D3B', width: 40, fontSize: 11}}>
                        {item}
                      </Text>
                      <View
                        style={{
                          width: 1,
                          height: '100%',
                          backgroundColor: '#E2E2E2',
                          marginLeft: 10,
                        }}
                      />
                      <View
                        style={{
                          marginLeft: 5,
                          width: '100%',
                          marginTop: margintop || 0,
                          backgroundColor: '#F6F4E7',
                          height: `${diff}%` || 0,
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 21,
            }}>
            <TouchableOpacity
              onPress={() => setShowPickerFrom(true)}
              style={{
                backgroundColor: '#E2E2E2',
                width: 105,
                height: 36,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                {fromTime || 'NA'}
              </Text>
            </TouchableOpacity>
            <Text style={{marginHorizontal: 20}}>TO</Text>
            <TouchableOpacity
              onPress={() => setShowPickerTo(true)}
              style={{
                backgroundColor: '#E2E2E2',
                width: 105,
                height: 36,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                {toTime || 'NA'}
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            showPicker={showPickerFrom}
            setShowPicker={setShowPickerFrom}
            time={fromTime}
            setTime={setFromTime}
          />
          <DateTimePicker
            showPicker={showPickerTo}
            setShowPicker={setShowPickerTo}
            time={toTime}
            setTime={setToTime}
          />
        </View>
        <TouchableOpacity
          onPress={() => addtoSchedule()}
          style={{
            paddingVertical: 19,
            width: '92%',
            backgroundColor: '#03878F',
            borderRadius: 6,
            marginTop: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 17}}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalSheet;
