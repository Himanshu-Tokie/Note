import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { screenConstant } from '../../constants';
import { images } from '../../constants/Images';
import { COLORS, DARK_COLORS } from '../../constants/colors';

export default function LabelTemplate({icon, text, files, note}) {
  const nav = useNavigation();
  function navigationHandler() {
    nav.navigate(screenConstant.Label, {text, note});
  }
  const colorScheme = useSelector((state) => state.theme.theme);;
  return (
    <>
      <View style={styles.sub}>
        <ImageBackground
          source={colorScheme==='light'? images.LABEL:images.DARK_LABEL}
          resizeMode="cover"
          style={styles.container}>
          <TouchableOpacity onPress={navigationHandler}>
            <View style={styles.inner}>
              {icon(heightPercentageToDP('6.2%'), heightPercentageToDP('6.2%'))}
              <Text style={[styles.text,{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1}]}>{text}</Text>
              <Text style={{color:colorScheme==='light'?COLORS.TEXT1:DARK_COLORS.TEXT1}}>{files} Files</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  sub: {
    paddingHorizontal: widthPercentageToDP('1.1%'),
    paddingTop: heightPercentageToDP('1.1%'),
    paddingBottom: heightPercentageToDP('1.4%'),
    // backgroundColor:COLORS.BACKGROUND,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  container: {
    height: heightPercentageToDP('20%'),
    width: widthPercentageToDP('44.5%'),
    flex: 1,
    justifyContent: 'center',
    // alignContent:'center',
    // alignItems: 'center',
  },
  text: {
    paddingTop: heightPercentageToDP('1.2%'),
    fontWeight: 'bold',
  },
  inner: {
    paddingLeft: widthPercentageToDP('7%'),
  },
});
