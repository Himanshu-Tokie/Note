import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import withTheme from '../HOC';
import { styles } from './style';


  const DropdownComponent = ({data,value, setValue,theme}) => {
    const [isFocus, setIsFocus] = useState(false);
    const labelData = [{'label':''}]
    data.forEach((label)=>{
        labelData.push({'label':label.id})
    })
    const THEME = theme 

    return (
      <View style={[styles.container,{backgroundColor:THEME.BACKGROUND}]}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
          placeholderStyle={[styles.placeholderStyle,THEME.NOTETEXT]}
          selectedTextStyle={[styles.selectedTextStyle,THEME.NOTETEXT]}
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

  export default withTheme(DropdownComponent);
