import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
// customText
export const style = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center',
    },
    text:{
        fontSize:20,
        color:COLORS.TEXT1,
        // fontWeight:'bold'
    }
})