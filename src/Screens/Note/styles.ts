import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS, DARK_COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  // NOT
    a: {
      fontWeight: 'bold',
      color: COLORS.BACKGROUND1,
    },
    container: {
      flex: 1,
      backgroundColor: DARK_COLORS.BACKGROUND,
    },
    editor: {},
    rich: {
      flex: 1,
    },
    // text under rich 
    richeditor:{
      backgroundColor: DARK_COLORS.BACKGROUND,
      color:COLORS.NOTETEXT,
      fontFamily:'Nunito',
    },
    richBar: {},
    // NOT
    tib: {
      textAlign: 'center',
      color: '#515156',
    },
    title:{
      fontFamily:'Nunito',
      fontSize:heightPercentageToDP('2.4%'),
      paddingVertical:heightPercentageToDP('2.4%'),
      color:COLORS.NOTETEXT,
      paddingHorizontal:widthPercentageToDP('2%')
      // paddingLeft:
    },
    subContainer:{
      // marginHorizontal:16,
      flex:1
    }
  });
  