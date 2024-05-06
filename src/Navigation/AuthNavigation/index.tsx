import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Screens/Home";
import Label from "../../Screens/Labels";
import Note from "../../Screens/Note";
import FormikTemp from "../../Screens/Practice/formikTemplate";
import Setting from "../../Screens/Setting";
import Enter from "../../Screens/enter";
import ForgotPassword from "../../Screens/forgotPassword/forgotPass";
import LogIn from "../../Screens/logIn";
import SignUp from "../../Screens/signUp";
import { screenConstant } from "../../constants/index";

export default function AuthNavigation(){
    const Stack = createNativeStackNavigator();
    return(
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screenConstant.Enter}>
                <Stack.Screen name={screenConstant.Enter} component={Enter} options={{headerShown:false}}/>
                <Stack.Screen name={screenConstant.Login} component={LogIn} />
                <Stack.Screen name={screenConstant.Home} component={Home} options={{headerShown:false}}/>
                <Stack.Screen name={screenConstant.Note} component={Note} />
                <Stack.Screen name={screenConstant.SignUp} component={SignUp} />
                <Stack.Screen name={screenConstant.ForgotPassword} component={ForgotPassword} />
                <Stack.Screen name={screenConstant.Formik} component={FormikTemp} />
                <Stack.Screen name={screenConstant.Label} component={Label} />
                <Stack.Screen name={screenConstant.Setting} component={Setting} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

// useNavigation