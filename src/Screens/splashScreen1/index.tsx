import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import Fade from 'react-native-fade';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { styles } from './style';

export default function Splash() {
  const navigation = useNavigation();
  // const isLogedIn = useSelector(state => state.common.isLogedIn);
  const isLogedIn = useRef('false');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    async function fetchAllData() {
      // await AsyncStorage.clear();
      const Data = await AsyncStorage.getAllKeys();
      const fetchedData = await AsyncStorage.multiGet(Data).then((fetchedData)=>{
        console.log(typeof(JSON.parse(fetchedData[0][1])),159);
        
        // isLogedIn.current = fetchedData ? fetchedData[1][1] : false;
        setTimeout(() => {
          if (fetchedData.length) {
            if(JSON.parse(fetchedData[0][1])) {
              {console.log(2);}
                                                         
            navigation.navigate(screenConstant.Home);}
            else {
              navigation.navigate(screenConstant.Enter);
            }
          } else {
            console.log(3);
            navigation.navigate(screenConstant.Enter);
          }
        }, 2000);
      })

      // fetchedData.forEach(([key, value]) => {
      //   userData[key] = JSON.parse(value);
      // });
    }
    fetchAllData();

  }, []);
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
