import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        paddingHorizontal:widthPercentageToDP('4%'),
        justifyContent:'space-between',
        backgroundColor:'white',
        marginHorizontal:widthPercentageToDP('5%'),
        borderRadius:15,
        paddingVertical:heightPercentageToDP('1.6%'),
        marginTop:heightPercentageToDP('2%'),
        // position:'absolute',
        bottom:heightPercentageToDP('4%'),
        right:0,
        left:0,
      }
})