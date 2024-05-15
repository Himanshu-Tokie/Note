// signup
import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(249, 248, 253)',
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
        color:'rgb(9,9,10)',
        fontFamily:'Nunito'
    }
})