import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native";

export default function LabelTemplate(){
    return(
        <>
        <View style={styles.subcontainer}>
            <ImageBackground
                source={{uri:'/Users/himanshusaha/Documents/Note/src/assets/svg/Group245.png'}}
                resizeMode="cover"
                style={styles.container}
                >
                    <Text>imanshu</Text>
                </ImageBackground>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    subcontainer:{
        // flex:1
    },
    container:{
        height:200,
        width:200,
        // flex:1,
        justifyContent: 'center',
    }
})