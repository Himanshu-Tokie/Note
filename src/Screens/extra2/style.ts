import { StyleSheet } from "react-native";
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
        paddingTop:28
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
    }
})

