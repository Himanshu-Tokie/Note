import React from 'react';
import { Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/Button/customButton';
import CustomText from '../../components/Text/customText';
import { ICONS } from '../../constants/Icons';
import { COLORS, DARK_COLORS } from '../../constants/colors';
import { screenConstant } from '../../constants/index';
import { STRINGS } from '../../constants/strings';
import Google from './google';
import { styles } from './style';


export default function Enter({ navigation }) {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     // Prevent the default action of navigating back
  //     e.preventDefault();
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  const onPress = () => {
    navigation.navigate(screenConstant.SignUp);
  };
  const logIn = () => {
    navigation.navigate(screenConstant.Login);
  };
  const colorScheme = useSelector((state) => state.theme.theme);
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colorScheme==='light'?COLORS.BACKGROUND:DARK_COLORS.BACKGROUND}]}>
      <View style={styles.subContainer}>
        <View style={styles.viewText}>
            <Text style={[styles.text1,styles.font]}>{STRINGS.NOTE_TAKING_APP.PART1}</Text>
            <Text style={[styles.text2,styles.font,{color:colorScheme==='light'?COLORS.FOOTER:DARK_COLORS.TEXT1}]}>{STRINGS.NOTE_TAKING_APP.PART2}</Text>
          </View>
        <View style={styles.svg}>
          {ICONS.DAIRY(widthPercentageToDP('60'),heightPercentageToDP('25'),)}
        </View>
        <CustomText
          text={STRINGS.SAVE_SHARE_NOTES}
          styles={[styles.textSave, styles.font,{color:colorScheme==='light'?COLORS.FOOTER:DARK_COLORS.TEXT1}]}
        />
        <CustomButton text={STRINGS.CREATE_ACCOUNT} onPress={onPress}/>
        <Google></Google>
        <View style={styles.footer}>
          <CustomText text={STRINGS.HAVE_ACCOUNT} styles={[styles.simpleText,{color:colorScheme==='light'?COLORS.FOOTER:DARK_COLORS.TEXT1}]} />
          <Text onPress={logIn} style={[styles.simpleText, styles.colorText]}>
            {STRINGS.LOG_IN}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
