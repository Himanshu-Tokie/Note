import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        paddingHorizontal:16,
        justifyContent:'space-between',
        backgroundColor:'white',
        marginHorizontal:18,
        borderRadius:15,
        paddingVertical:RFValue(10),
        marginTop:15,
        position:'absolute',
        bottom:40,
        right:0,
        left:0
      }
})