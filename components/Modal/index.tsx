/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {differenceFinder} from '../../helpers';
import {Picker} from '@react-native-picker/picker';

interface propsType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  schedules: {title: string; fromTime: string; toTime: string}[];
}

const ModalSheet = ({showModal, setShowModal, schedules}: propsType) => {
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
                  const difference = differenceFinder(
                    meetings[item.substring(0, 2)]?.fromTime,
                    meetings[item.substring(0, 2)]?.toTime,
                  );
                  let height =
                    (parseInt(
                      meetings[item.substring(0, 2)]?.toTime.substring(3, 5),
                    ) /
                      60) *
                    100;
                  let margintop =
                    (parseInt(
                      meetings[item.substring(0, 2)]?.fromTime.substring(3, 5),
                    ) /
                      60) *
                    100;
                  // height === 0 ? (height = 100) : null;
                  height = height + difference;
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
                          height: `${height}%` || 0,
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
            <View
              style={{
                backgroundColor: '#E2E2E2',
                width: 105,
                height: 36,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                {'11:15 AM'}
              </Text>
            </View>
            <Text style={{marginHorizontal: 20}}>TO</Text>
            <View
              style={{
                backgroundColor: '#E2E2E2',
                width: 105,
                height: 36,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                {'11:15 AM'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
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
