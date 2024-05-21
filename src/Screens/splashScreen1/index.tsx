import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import Fade from 'react-native-fade';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { COLORS, DARK_COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { logIn } from '../../store/common';
import { styles } from './style';

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLogedIn = useSelector(state => state.common.isLogedIn);
  const [visible, setVisible] = useState(false);
  const colorScheme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    setVisible(true);

    async function fetchAllData() {
      // await AsyncStorage.clear();
      try {
        const keys = await AsyncStorage.getAllKeys();
        const fetchedData = await AsyncStorage.multiGet(keys);

        console.log(fetchedData, 789456);

        setTimeout(() => {
          if (fetchedData.length) {
            const isLoggedInData = fetchedData.find(([key]) => key === STRINGS.IS_LOGGED_IN);
            if (isLoggedInData && isLoggedInData[1]) {
              try {
                const isLoggedIn = JSON.parse(isLoggedInData[1]);
                if (isLoggedIn) {
                  console.log(isLoggedIn, 1341341234);
                  dispatch(logIn(true));
                  navigation.navigate(screenConstant.HomeNavigation);
                } else {
                  dispatch(logIn(false));
                  navigation.navigate(screenConstant.Enter);
                }
              } catch (e) {
                console.error('Error parsing isLoggedInData:', e);
                dispatch(logIn(false));
                navigation.navigate(screenConstant.Enter);
              }
            } else {
              navigation.navigate(screenConstant.Enter);
            }
          } else {
            console.log(3);
            navigation.navigate(screenConstant.Enter);
          }
        }, 100);
      } catch (e) {
        console.log(e);
        navigation.navigate(screenConstant.Enter);
      }
    }

    fetchAllData();
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colorScheme==='light'?COLORS.BACKGROUND:DARK_COLORS.BACKGROUND}]}>
      <View style={styles.view}>
        <Fade visible={visible} direction="up" duration={200}>
          <View style={styles.icon}>
            {ICONS.BOOK(
              heightPercentageToDP('14%'),
              heightPercentageToDP('14%'),
              'none',
            )}
          </View>
          <View style={styles.viewText}>
            <Text style={styles.text1}>Note-Ta</Text>
            <Text style={[styles.text2,{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1}]}>king App</Text>
          </View>
        </Fade>
        <ActivityIndicator style={styles.indicator} size={'large'} />
      </View>
    </SafeAreaView>
  );
}
