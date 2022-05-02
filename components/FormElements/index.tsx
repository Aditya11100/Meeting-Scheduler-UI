/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';

export enum KEYBOARD_ACTUAL_TYPE {
  NAME_TYPE = 'default',
  DESCRIPTION_TYPE = 'default',
  ADDRESS_TYPE = 'default',
  PASSWORD_TYPE = 'default',
  NUMBER_TYPE = 'number-pad',
  DECIMAL_NUMBER_TYPE = 'decimal-pad',
  NUMERIC_TYPE = 'numeric',
  EMAIL_TYPE = 'email-address',
  PHONE_NUMBER_TYPE = 'phone-pad',
}

export enum KEYBOARD_TYPE {
  NAME_TYPE = 'NAME_TYPE',
  DESCRIPTION_TYPE = 'DESCRIPTION_TYPE',
  ADDRESS_TYPE = 'ADDRESS_TYPE',
  PASSWORD_TYPE = 'PASSWORD_TYPE',
  NUMBER_TYPE = 'NUMBER_TYPE',
  DECIMAL_NUMBER_TYPE = 'DECIMAL_NUMBER_TYPE',
  NUMERIC_TYPE = 'NUMERIC_TYPE',
  EMAIL_TYPE = 'EMAIL_TYPE',
  PHONE_NUMBER_TYPE = 'PHONE_NUMBER_TYPE',
}

interface FormElementProps {
  type: string;
  containerViewStyle?: object;
  textInputStyle?: object;
  placeHolder?: string;
  value?: string;
  onChangeText?: (text) => void;
}

const FormElement = React.forwardRef((props: FormElementProps, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const bcolor = {
    backgroundColor: 'rgba(214, 214, 214, 0.3)',
    borderColor: 'rgba(35, 32, 28, 0.2)',
  };

  if (isFocused) {
    bcolor.backgroundColor = '#FFFFFF';
    bcolor.borderColor = '#F8D834';
  } else {
    bcolor.backgroundColor = 'rgba(214, 214, 214, 0.3)';
    bcolor.borderColor = 'rgba(35, 32, 28, 0.2)';
  }

  switch (props.type) {
    case KEYBOARD_TYPE.PASSWORD_TYPE:
      return (
        <View style={{paddingHorizontal: 20, position: 'relative'}}>
          <TextInput
            ref={ref}
            secureTextEntry={true}
            keyboardType={KEYBOARD_ACTUAL_TYPE[props.type]}
            placeholderTextColor={'rgba(35, 32, 28, 0.5)'}
            placeholder={props.placeHolder}
            onBlur={() => {
              setIsFocused(false);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            value={props.value}
            onChangeText={text => props.onChangeText(text)}
            style={[
              {
                borderWidth: 1,
                height: 56,
                borderRadius: 14,
                paddingHorizontal: 20,
                fontSize: 14,
              },
              bcolor,
              props.textInputStyle,
              props.containerViewStyle,
            ]}
          />
        </View>
      );
    case KEYBOARD_TYPE.NAME_TYPE:
      return (
        <View style={{paddingHorizontal: 20}}>
          <TextInput
            ref={ref}
            keyboardType={KEYBOARD_ACTUAL_TYPE[props.type]}
            placeholderTextColor={'rgba(35, 32, 28, 0.5)'}
            placeholder={props.placeHolder}
            onBlur={() => {
              setIsFocused(false);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            value={props.value}
            onChangeText={text => props.onChangeText(text)}
            style={[
              {
                borderWidth: 1,
                height: 56,
                borderRadius: 14,
                paddingHorizontal: 20,
                fontSize: 14,
                opacity: 0.5,
              },
              bcolor,
              props.textInputStyle,
              props.containerViewStyle,
            ]}
          />
        </View>
      );
  }
});

export default FormElement;
