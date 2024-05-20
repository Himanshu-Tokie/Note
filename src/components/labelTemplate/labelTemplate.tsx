import { useNavigation } from '@react-navigation/native';
import {
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import { screenConstant } from '../../constants';
import { images } from '../../constants/Images';
import { COLORS } from '../../constants/colors';

export default function LabelTemplate({icon, text, files, note}) {
  const nav = useNavigation();
  function navigationHandler() {
    nav.navigate(screenConstant.Label, {text, note});
  }

  return (
    <>
      <View style={styles.sub}>
        <ImageBackground
          source={images.LABEL}
          resizeMode="cover"
          style={styles.container}>
          <TouchableOpacity onPress={navigationHandler}>
            <View style={styles.inner}>
              {icon(heightPercentageToDP('6.2%'), heightPercentageToDP('6.2%'))}
              <Text style={styles.text}>{text}</Text>
              <Text style={{color:COLORS.TEXT1}}>{files} Files</Text>
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
    color: COLORS.TEXT1,
  },
  inner: {
    paddingLeft: widthPercentageToDP('7%'),
  },
});
