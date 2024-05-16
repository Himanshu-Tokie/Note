import React from 'react';
import { Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/Button/customButton';
import CustomText from '../../components/Text/customText';
import { ICONS } from '../../constants/Icons';
import { screenConstant } from '../../constants/index';
import { STRINGS } from '../../constants/strings';
import Google from './google';
import { styles } from './style';


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
        <View style={styles.viewText}>
            <Text style={[styles.text1,styles.font]}>{STRINGS.NOTE_TAKING_APP.PART1}</Text>
            <Text style={[styles.text2,styles.font]}>{STRINGS.NOTE_TAKING_APP.PART2}</Text>
          </View>
        <View style={styles.svg}>
          {ICONS.DAIRY(widthPercentageToDP('60'),heightPercentageToDP('25'),)}
        </View>
        <CustomText
          text={STRINGS.SAVE_SHARE_NOTES}
          styles={[styles.textSave, styles.font]}
        />
        <CustomButton text={STRINGS.CREATE_ACCOUNT} onPress={onPress}/>
        <Google></Google>
        <View style={styles.footer}>
          <CustomText text={STRINGS.HAVE_ACCOUNT} styles={[styles.simpleText]} />
          <Text onPress={logIn} style={[styles.simpleText, styles.colorText]}>
            {STRINGS.LOG_IN}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
