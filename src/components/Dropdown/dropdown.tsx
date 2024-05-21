import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { COLORS, DARK_COLORS } from '../../constants/colors';


  const DropdownComponent = ({data,value, setValue}) => {
    const [isFocus, setIsFocus] = useState(false);
    const labelData = [{'label':''}]
    console.log(data,65);
    data.forEach((label)=>{
        labelData.push({'label':label.id})
    })
    const colorScheme = useSelector((state) => state.theme.theme);

    return (
      <View style={[styles.container,{backgroundColor:colorScheme==='light'?COLORS.BACKGROUND:DARK_COLORS.BACKGROUND}]}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
          placeholderStyle={[styles.placeholderStyle,{color:colorScheme === 'light' ? COLORS.NOTETEXT : DARK_COLORS.NOTETEXT}]}
          selectedTextStyle={[styles.selectedTextStyle,{color:colorScheme === 'light' ? COLORS.NOTETEXT : DARK_COLORS.NOTETEXT}]}
          data={labelData}
          maxHeight={heightPercentageToDP('30%')}
          labelField="label"
          valueField="label"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.label);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color:'red'
    },
    selectedTextStyle: {
      fontSize: 16,color:'red'
    },
    })