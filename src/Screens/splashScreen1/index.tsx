import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import Fade from 'react-native-fade';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { styles } from './style';

export default function Splash() {
  const navigation = useNavigation();
  const isLogedIn = useSelector(state => state.common.isLogedIn);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    setTimeout(()=>{

        if (isLogedIn) {
            console.log(isLogedIn,7878);
            navigation.navigate(screenConstant.Home)
        }
        else{
            navigation.navigate(screenConstant.Enter)
        }
    },2000)
    });
  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.text2}>king App</Text>
          </View>
        </Fade>
        <ActivityIndicator style={styles.indicator} size={'large'} />
      </View>
    </SafeAreaView>
  );
}
