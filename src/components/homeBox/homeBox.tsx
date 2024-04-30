import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenConstant } from "../../constants/Screen";


export default function Box({text,nav,note}){
    function navigationHandler(){
        nav.navigate(screenConstant.Label,{text,note})
    }
    return (
        <>    
            <TouchableOpacity onPress={navigationHandler}>
            <View style={styles.container}>
            <Text style = {styles.text}>
                {text.id}
            </Text>
            <Text style = {styles.text}>
                {text.count}
            </Text>
        </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        height:150,
        width:150,
        borderWidth:2,
        borderColor:'black',
        margin:20,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
    }
})