import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
    return(
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screenConstant.Enter}>
                <Stack.Screen name={screenConstant.Enter} component={Enter} options={{headerShown:false}}/>
                <Stack.Screen name={screenConstant.Login} component={LogIn} />
                <Stack.Screen name={screenConstant.Home} component={HomeNavigation} options={{headerShown:false}}/>
                <Stack.Screen name={screenConstant.Note} component={Note} />
                <Stack.Screen name={screenConstant.SignUp} component={SignUp} />
                <Stack.Screen name={screenConstant.ForgotPassword} component={ForgotPassword} />
                {/* <Stack.Screen name={screenConstant.Formik} component={FormikTemp} /> */}
                <Stack.Screen name={screenConstant.Label} component={Label} />
                {/* <Stack.Screen name={screenConstant.Setting} component={Setting} /> */}
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

// useNavigation