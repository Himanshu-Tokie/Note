import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { COLORS, DARK_COLORS } from '../../constants/colors';

export default function DateTime({date, setDate}) {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const colorScheme = useSelector(state => state.theme.theme);

  return (
    <>
      <View style={[styles.container,{backgroundColor:colorScheme==='light'?COLORS.SETTING_BOX:DARK_COLORS.SETTING_BOX}]}>
        <View style={styles.subContainer}>
          <View>
            <Text style={[styles.text,{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1,fontWeight:'bold'}]}>Pick Date</Text>
          </View>
          <View>
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={[styles.text,{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1}]}>
                {date.toLocaleString().slice(0,9)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.subContainer]}>
          <View>
            <Text style={[styles.text,{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1,fontWeight:'bold'}]}>Pick Time</Text>
          </View>
          <View>
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={[styles.text,{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1}]}>
                {date.toLocaleString().slice(10)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:widthPercentageToDP('5%')
  },
  subContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:heightPercentageToDP('1%')
  },
  text:{
    fontFamily:'Nunito',
    fontSize:heightPercentageToDP('2%')
  }
})