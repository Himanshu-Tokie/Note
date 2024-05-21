import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  // NOT
    a: {
      fontWeight: 'bold',
      color: COLORS.BACKGROUND1,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.BACKGROUND,
    },
    editor: {},
    rich: {
      flex: 1,
    },
    // text under rich 
    richeditor:{
      // color:COLORS.NOTETEXT,
      fontFamily:'Nunito',
      // backgroundColor: COLORS.BACKGROUND,
    },
    richBar: {
      backgroundColor:COLORS.BACKGROUND1
      // alignItems:'center',
      // alignContent:'center',
      // justifyContent:'center'
    },
    // NOT
    tib: {
      textAlign: 'center',
      color: '#515156',
    },
    title:{
      fontFamily:'Nunito',
      fontSize:heightPercentageToDP('2.4%'),
      paddingVertical:heightPercentageToDP('2.4%'),
      paddingHorizontal:widthPercentageToDP('2%')
      // paddingLeft:
    },
    subContainer:{
      // marginHorizontal:16,
      flex:1
    }
  });
  