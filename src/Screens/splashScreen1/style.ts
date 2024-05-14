import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(238,238,242)',
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
        color:'rgb(107,78,225)',
        fontSize:heightPercentageToDP('3.2%')       
    },
    text2:{
        fontFamily:'Nunito', 
        fontWeight:'bold',
        color:'rgb(9,9,10)',
        fontSize:heightPercentageToDP('3.2%')        
    },
    icon:{
        alignItems:'center'
    }
})