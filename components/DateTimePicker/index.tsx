import React from 'react';
import {View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const DateTimePicker = ({showPicker, setShowPicker, time, setTime}) => {
  const handleConfirm = date => {
    const time = moment(date).format('LT');
    if (time.charAt(1) === ':') {
      setTime('0' + time);
    } else {
      setTime(time);
    }
    setShowPicker(false);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
        // minimumDate={new Date(minTime)}
      />
    </View>
  );
};

export default DateTimePicker;
