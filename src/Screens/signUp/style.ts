// signup
import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { COLORS, DARK_COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:DARK_COLORS.BACKGROUND,
        flex:1,
    },

    subContainer:{
        paddingTop:heightPercentageToDP('3%'),
        alignItems:'center',
        paddingBottom:heightPercentageToDP('3%')
        // marginHorizontal:0
        // alignContent:'center',
        // justifyContent:'center'
    },
    text:{
        color:COLORS.TEXT1,
        fontFamily:'Nunito'
    }
})