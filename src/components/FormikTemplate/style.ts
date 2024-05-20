// formik

import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        // marginHorizontal:20,
        // width:70,
        marginBottom:heightPercentageToDP('1.5%'),
        paddingVertical:heightPercentageToDP('1.8%'),
        paddingHorizontal:widthPercentageToDP('2%'),
        borderRadius:10
    },
    error:{
        color:'red',
        fontSize:heightPercentageToDP('1.5%'),
        fontStyle:'italic'
    },
    label:{
        color:'rgb(114,119,122)',
        paddingLeft:Platform.OS==='ios'?0:widthPercentageToDP('0.8%')
    },
    eye:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    icon:{
        
    }
})