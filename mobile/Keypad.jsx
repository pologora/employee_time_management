/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { actionDanger, backgroundLight, mainDark } from './Styles';

const styles = StyleSheet.create({
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  keypadButton: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 35,
    backgroundColor: backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    color: mainDark,
    fontSize: 26,
  },
});

export default function Keypad({ onPinChange }) {
  const [pin, setPin] = useState('');

  const handleDigitPress = (digit) => {
    const newPin = pin + digit;
    setPin(newPin);
    onPinChange(newPin);
  };

  const handleBackspacePress = () => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
    onPinChange(newPin);
  };

  const handleDalejPress = () => {
    const newPin = '';
    setPin(newPin);
    onPinChange(newPin);
  };

  return (
    <View>
      <View style={styles.keypadContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('1')}>
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('2')}>
            <Text style={styles.text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('3')}>
            <Text style={styles.text}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('4')}>
            <Text style={styles.text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('5')}>
            <Text style={styles.text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('6')}>
            <Text style={styles.text}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('7')}>
            <Text style={styles.text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('8')}>
            <Text style={styles.text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('9')}>
            <Text style={styles.text}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.keypadButton} onPress={handleBackspacePress}>
            <Icon name="md-backspace" size={40} color={actionDanger} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleDigitPress('0')}>
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.next]}
            onPress={handleDalejPress}
            disabled={pin.length < 3 && true}
          >
            <AntDesign name="checkcircle" size={68} color={pin.length > 2 ? 'green' : 'gray'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
