import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

export default function CustomButton({text,onPress,disabled=false,style}){
    console.log(text);    
    const customstyles = style??[]
    return(
        <View style={[styles.container,...customstyles]}>
            <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
