import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { screenConstant } from '../../constants';
import { images } from '../../constants/Images';
import withTheme from '../HOC';
import { styles } from './style';

function LabelTemplate({icon, text, files, note,theme}) {
  const nav = useNavigation();
  function navigationHandler() {
    nav.navigate(screenConstant.Label, {text, note});
  }
  const colorScheme = useSelector(state=>state.theme.theme)
  const THEME = theme ;
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
              <Text style={[styles.text,{color:THEME.TEXT1}]}>{text}</Text>
              <Text style={{color:THEME.TEXT1}}>{files} Files</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
}
export default withTheme(LabelTemplate)


