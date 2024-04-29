import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomButton({text,onPress}){
    console.log(text);    
    return(
        <View style={style.container}>
            <TouchableOpacity onPress={onPress}>
            <Text>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const style=StyleSheet.create({
    container:{
        borderRadius:20,
        backgroundColor:"blue",

    }
})