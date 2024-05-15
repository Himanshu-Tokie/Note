import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    a: {
      fontWeight: 'bold',
      color: 'rgb(107,78,255)',
    },
    container: {
      flex: 1,
      backgroundColor: 'rgb(249, 248, 253)',
    },
    editor: {},
    rich: {
      flex: 1,
    },
    // text under rich 
    richeditor:{
      backgroundColor: 'rgb(249, 248, 253)',
      color:'rgb(42,34,81)',
      fontFamily:'Nunito',
    },
    richBar: {},
    tib: {
      textAlign: 'center',
      color: '#515156',
    },
    title:{
      fontFamily:'Nunito',
      fontSize:heightPercentageToDP('2.4%'),
      paddingVertical:heightPercentageToDP('2.4%'),
      color:'rgb(42,34,81)',
      paddingHorizontal:widthPercentageToDP('2%')
      // paddingLeft:
    },
    subContainer:{
      marginHorizontal:16,
      flex:1
    }
  });
  