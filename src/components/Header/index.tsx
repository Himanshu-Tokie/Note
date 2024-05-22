import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { ICONS } from '../../constants/Icons';
import { COLORS, DARK_COLORS } from '../../constants/colors';
import Icon from '../Icon';

export default function Header({
  onChangeText,
  notesData,
  setSearchData,
  headerText,
}) {
  const navigation = useNavigation();
  const [isFocussed, setIsFocused] = useState(false);
  // console.log(isFocussed);
  const [value,setValue] = useState('')
  const theme = useSelector((state) => state.theme.theme);
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.leftHeader}>
            {ICONS.BACK(23, 23, 'none')}
            {/* <Icon icon={ICONS.BACK} height={23} width={23} color='none' /> */}
            <Text style={[styles.text]}>Back</Text>
          </View>
        </Pressable>
        {!isFocussed && (
          <View>
            <Text style={[styles.headerText,{color:theme === 'light'? COLORS.TEXT4:DARK_COLORS.TEXT4}]}>{headerText}</Text>
          </View>
        )}
        <View
          style={[styles.rightHeader, isFocussed && styles.rightHeaderFocused]}>
          {setSearchData && (
            <TouchableOpacity style={styles.searchContainer}>
              {!isFocussed && (
                <Icon
                  icon={ICONS.SEARCH}
                  height={23}
                  width={23}
                  color="none"
                  style={styles.iconContainer}
                />
              )}
              <TextInput
                style={[styles.text,{paddingTop:0}]}
                placeholder="Search"
                value={value}
                placeholderTextColor={COLORS.HEADER}
                onChangeText={text=>{onChangeText(text);setValue(text)}}
                onFocus={() => {
                  setIsFocused(true);
                  console.log('focus');
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setSearchData(notesData);
                  console.log('blur');
                  setValue('')
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthPercentageToDP('2%'),
    marginVertical: heightPercentageToDP('1.5%'),
  },
  searchContainer: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    marginHorizontal: widthPercentageToDP('2%'),
    // flex:1
  },
  rightHeaderFocused: {
    flex: 1,
    marginLeft: widthPercentageToDP('2%'),
  },
  headerText: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: heightPercentageToDP('2.2%'),
    marginLeft: 10,
    color: COLORS.TEXT1,
    // marginHorizontal:60
  },
  leftHeader: {
    flexDirection: 'row',
  },
  rightHeader: {
    width: widthPercentageToDP('25%'),
    // flex:()
    // flex:1,
  },
  text: {
    fontSize: heightPercentageToDP('2%'),
    color: COLORS.TEXT4,
    paddingTop: 2,
    fontFamily: 'Nunito',
  },
  iconContainer: {
    paddingRight: 5,
  },
});
