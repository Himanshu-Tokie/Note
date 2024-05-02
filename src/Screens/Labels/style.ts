import { StyleSheet, useWindowDimensions } from "react-native";
const widthWindow  = useWindowDimensions().width;
export const styles = StyleSheet.create({
    container:{
        flex: 1,
    backgroundColor: 'rgb(249, 248, 253)',
    },
    subContainer:{
        // maxWidth:RFPercentage(50),
        // width:"50%",
        // width:100
    }
})

