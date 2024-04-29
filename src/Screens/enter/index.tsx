import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import CustomText from "../../components/Text/customText";
import Diary from "../../assets/svg/Diary.svg"
import CustomButton from "../../components/Button/customButton";
import { screenConstant } from "../../constants/Screen/index";

export default function Enter({navigation}) {
    const onPress = ()=>{
        navigation.navigate(screenConstant.SignUp)
    }
    const logIn =()=>{
        navigation.navigate(screenConstant.Login)
    }
    return (
        <SafeAreaView>
            <View>
                <CustomText text='Note-Taking App'/>
                {/* <Diary/> */}
                <CustomText text='Save and share notes'/>
                
                <CustomButton text='Create Account' onPress={onPress}/>
                <CustomText text='Have an account?'/>
                <Button title="Log In" onPress={logIn}/>
            </View>
        </SafeAreaView>
    );
}
