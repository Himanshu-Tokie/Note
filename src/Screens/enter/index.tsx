import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SVGImg from '../../assets/svg/Diary.svg';
import CustomButton from '../../components/Button/customButton';
import CustomText from '../../components/Text/customText';
import { screenConstant } from '../../constants/Screen/index';
import Google from './google';
import { styles } from './style';
export default function Enter({navigation}) {
    const [user,setUser] = useState()
  const onPress = () => {
    navigation.navigate(screenConstant.SignUp);
  };
  const logIn = () => {
    navigation.navigate(screenConstant.Login);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <CustomText
          text="Note-Taking App"
          styles={[styles.textNote, styles.font]}
        />
        {/* <Diary/> */}
        <View style={styles.svg}>
          {/* <Svg width="220" height="220">
          <Path d={MySvg} fill="blue" />
        </Svg> */}
        <SVGImg width={220} height={220} />
        </View>
        <CustomText
          text="Save and share notes"
          styles={[styles.textSave, styles.font]}
        />

        <CustomButton text="Create Account" onPress={onPress} />
        <Google setState={setUser}></Google>
        <View style={styles.footer}>
          <CustomText text="Have an account?" styles={[styles.simpleText]} />
          <Text onPress={logIn} style={[styles.simpleText,styles.colorText]}>
            Log In
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
