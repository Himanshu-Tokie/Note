import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../constants/colors";
// Enter
export const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.BACKGROUND,
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
        color:COLORS.TEXT2,
        fontSize:heightPercentageToDP('3.2%')       
    },
    text2:{
        fontFamily:'Nunito', 
        fontWeight:'bold',
        color:COLORS.TEXT1,
        fontSize:heightPercentageToDP('3.2%')        
    },
    textSave:{
        fontSize:heightPercentageToDP('3%'),
        fontFamily:'Nunito',
        color:COLORS.SAVE
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
        color:COLORS.TEXT1,
        paddingTop:heightPercentageToDP('.5%')
    },
    footer:{
        flexDirection:'row'
    },
    colorText:{
        color:COLORS.BACKGROUND1,
        paddingTop:heightPercentageToDP('1%'),
        fontWeight:'bold'
    },
    viewText:{
        flexDirection:'row'
    },
})
