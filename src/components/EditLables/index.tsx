import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../constants/Icons";
import Icon from "../Icon";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function EditLables({onChangeText}) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <TouchableOpacity>
                        <Icon icon={ICONS.CROSS} height={24} width={24} color={'#B6B0D9'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.text}>
                    <TextInput placeholder="Create new label" onChangeText={onChangeText}/>
                </View>
                <View style={styles.icon}>
                    <TouchableOpacity>
                        <Icon icon={ICONS.TICK} height={30} width={30} color={'#B6B0D9'} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginTop:heightPercentageToDP('1.5%'),
        borderTopWidth:1.5,
        borderBottomWidth:1.5,
        borderColor:'#B6B0D9'
    },
    text: {
        // borderWth: 1,
        flex: 1,
        paddingHorizontal: widthPercentageToDP('2%'),
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: heightPercentageToDP('2%'),
    },
    icon: {
        padding: heightPercentageToDP('1.5%')
    }
})