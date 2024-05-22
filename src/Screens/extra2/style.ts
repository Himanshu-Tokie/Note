import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    },
    subContainer:{
        // maxWidth:RFPercentage(50),
        // width:"50%",
        // width:100
        paddingTop:heightPercentageToDP('2.4%')
    },
    list:{
        
    },
    addNotes:{
        position:'absolute',
        bottom:40,
        left:'25%'
    },
    customButton:{
        width:200
    },
    noReminder:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        paddingBottom:heightPercentageToDP('10%')
    },
    noReminderText:{
        textAlign:'center',
        fontFamily:'Nunito',
        fontSize:heightPercentageToDP('2.5'),
        fontWeight:'bold'
    }
})

