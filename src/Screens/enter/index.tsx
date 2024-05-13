import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/Button/customButton';
import CustomText from '../../components/Text/customText';
import { ICONS } from '../../constants/Icons';
import { screenConstant } from '../../constants/index';
import Google from './google';
import { styles } from './style';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


export default function Enter({ navigation }) {
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
        <View style={styles.svg}>
          {ICONS.DAIRY(widthPercentageToDP('60'),heightPercentageToDP('25'),)}
        </View>
        <CustomText
          text="Save and share notes"
          styles={[styles.textSave, styles.font]}
        />
        <CustomButton text="Create Account" onPress={onPress}/>
        <Google></Google>
        <View style={styles.footer}>
          <CustomText text="Have an account?" styles={[styles.simpleText]} />
          <Text onPress={logIn} style={[styles.simpleText, styles.colorText]}>
            Log In
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
