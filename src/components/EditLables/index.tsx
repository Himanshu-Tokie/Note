import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function EditLables(){
    return (
        <>
        <View style={styles.container}>
            <View>

            </View>
            <View>
                <TextInput placeholder="Create new label">
                </TextInput>
            </View>
            <View>

            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    }
})