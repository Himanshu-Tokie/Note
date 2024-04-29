import { View, Text } from "react-native";

export default function CustomText({text}){
    console.log(text);    
    return(
        <View>
            <Text>{text}</Text>
        </View>
    )
}