import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
// Enter
export const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(249, 248, 253)',
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        paddingTop:heightPercentageToDP('8%')
    },
    subContainer:{
        alignItems:'center',
        alignContent:'center',
    },
    // customText
    text1:{
        fontFamily:'Nunito', 
        fontWeight:'bold',
        color:'rgb(107,78,225)',
        fontSize:heightPercentageToDP('3.2%')       
    },
    text2:{
        fontFamily:'Nunito', 
        fontWeight:'bold',
        color:'rgb(9,9,10)',
        fontSize:heightPercentageToDP('3.2%')        
    },
    textSave:{
        fontSize:heightPercentageToDP('3%'),
        fontFamily:'Nunito',
        color:'rgb(9,10,10)'
    },
    font:{
        fontWeight:'bold'
    },
    svg:{
        marginVertical:heightPercentageToDP('5%'),
        paddingLeft:widthPercentageToDP('6%')
    },
    simpleText:{
        fontSize:heightPercentageToDP('1.8%'),
        fontFamily:'Nunito',
        color:'rgb(9,9,10)',
        paddingTop:heightPercentageToDP('.5%')
    },
    footer:{
        flexDirection:'row'
    },
    colorText:{
        color:'rgb(107,78,255)',
        paddingTop:heightPercentageToDP('1%'),
        fontWeight:'bold'
    },
    viewText:{
        flexDirection:'row'
    },
})
