import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        paddingHorizontal:widthPercentageToDP('4%'),
        justifyContent:'space-between',
        backgroundColor:COLORS.FOOTER,
        marginHorizontal:widthPercentageToDP('5%'),
        borderRadius:15,
        paddingVertical:heightPercentageToDP('2%'),
        marginTop:heightPercentageToDP('2%'),
        position:'absolute',
        bottom:heightPercentageToDP('3%'),
        right:0,
        left:0,
      }
})