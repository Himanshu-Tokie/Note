import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Label from "../../Screens/Labels";
import Note from "../../Screens/Note";
import Enter from "../../Screens/enter";
import ForgotPassword from "../../Screens/forgotPassword/forgotPass";
import LogIn from "../../Screens/logIn";
import SignUp from "../../Screens/signUp";
import { screenConstant } from "../../constants/index";
import HomeNavigation from "../HomeNavigation";

export default function AuthNavigation(){
    const Stack = createNativeStackNavigator();
    const [searchData,setSearchData] = useState([])
  const [notesData, setNotesData] = useState([]);
    const search=(e)=>{
        let text = e.toLowerCase();
        let filteredData = notesData.filter((item)=>{
          return item.data.toLowerCase().match(text) || item.title.toLowerCase().match(text)
        })
        console.log(filteredData); 
        setSearchData(filteredData);
      }
    return(
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screenConstant.Enter}
                screenOptions={{headerStyle:{backgroundColor:'rgb(249, 248, 253)'},
                headerTintColor:'rgb(107, 78, 253)',
                headerTitleStyle:{
                    fontWeight:'bold',
                    color:'black',
                    fontSize:20
                },
                }}> 
                <Stack.Screen name={screenConstant.Enter} component={Enter} options={{headerShown:false}}/>
                <Stack.Screen name={screenConstant.Login} component={LogIn} />
                <Stack.Screen name={screenConstant.Home} component={HomeNavigation} options={{headerShown:false}}/>
                <Stack.Screen name={screenConstant.Note} component={Note}
                // options={({route})=>({headerTitle:(props)=>(
                //     <TextInput value={route.params?route.params.note.label:'Others'}
                //     style={styles.title}/>
                // )})}
                options={{headerShown:false}}
                />
                <Stack.Screen name={screenConstant.SignUp} component={SignUp} />
                <Stack.Screen name={screenConstant.ForgotPassword} component={ForgotPassword} />
                <Stack.Screen name={screenConstant.Label} component={Label}
                options={{headerShown:false}}
                />
                {/* <Stack.Screen name={screenConstant.Setting} component={Setting} /> */}
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

// useNavigation
const styles = StyleSheet.create({
    title:{
        fontWeight:'bold',
        fontFamily:'Nunito',
        fontSize:25
    }
})

// options={({route})=>({headerTitle:(props)=>(
//     <TextInput placeholder={route.params?route.params.note.label:'Others'}/>
// )})}