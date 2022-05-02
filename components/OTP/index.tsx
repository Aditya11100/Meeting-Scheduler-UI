import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const OtpInput = () => {
  return (
    <>
      <TextInput
        style={[styles.otpInputBox]}
        keyboardType={'numeric'}
        returnKeyType={'next'}
        textAlign={'center'}
      />
    </>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  otpInputBox: {
    width: 47,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 4,
  },
});
