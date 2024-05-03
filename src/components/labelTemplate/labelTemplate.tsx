import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenConstant } from '../../constants';
import { images } from '../../constants/Images';

export default function LabelTemplate({icon, text, files, nav, note}) {
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
              {icon(52.52, 52.52)}
              <Text style={styles.text}>{text}</Text>
              <Text>{files} Files</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
            </View>
     </>
  );
}
const styles = StyleSheet.create({
  sub:{
    paddingHorizontal:5,
    paddingTop:9,
    paddingBottom:7,
    shadowColor: 'rgb(153,144,255)',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container: {
    height: RFValue(145),
    width: RFValue(150),
    flex:1,
    justifyContent: 'center',
    // alignContent:'center',
    // alignItems: 'center',
    
  },
  text: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
  inner: {
paddingLeft:35
  },
});
