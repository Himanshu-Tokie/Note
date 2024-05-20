import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../constants/colors";
export const styles = StyleSheet.create({
    container:{
        flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    },
    labelContainer:{
        paddingTop:heightPercentageToDP('2%')
    },
    subContainer:{
        marginBottom:heightPercentageToDP('28%')
    },
    list:{
        
    },
    addNotes:{
        position:'absolute',
        bottom:40,
        left:'25%'
    },
    customButton:{
        width:widthPercentageToDP('90%')
    }
})

