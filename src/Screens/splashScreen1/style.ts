import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.SPLASHSCREEN,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    view:{
        // alignContent:'center',
        // justifyContent:'center'
    },
    indicator:{
        paddingTop:heightPercentageToDP('10%')
    },
    viewText:{
        flexDirection:'row'
    },
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
    icon:{
        alignItems:'center'
    }
})