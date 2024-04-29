import { Button, SafeAreaView } from "react-native";

export default function Home({navigation,route}){
    const signOut =()=>{
        
    }
    return(
        <>
        <SafeAreaView>
            <Button title="SignOut" onPress={signOut}/>
        </SafeAreaView>
        </>
    )
}