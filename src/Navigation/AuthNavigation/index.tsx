import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screenConstant } from "../../constants/Screen/index";
import Enter from "../../Screens/enter";
import LogIn from "../../Screens/logIn";
import Home from "../../Screens/Home";
import Note from "../../Screens/Note";
import SignUp from "../../Screens/signUp";
import ForgotPassword from "../../Screens/forgotPassword/forgotPass";
import FormikTemp from "../../Screens/Practice/formikTemplate";

export default function AuthNavigation(){
    const Stack = createNativeStackNavigator();
    return(
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screenConstant.SignUp}>
                <Stack.Screen name={screenConstant.Enter} component={Enter} />
                <Stack.Screen name={screenConstant.Login} component={LogIn} />
                <Stack.Screen name={screenConstant.Home} component={Home} />
                <Stack.Screen name={screenConstant.Note} component={Note} />
                <Stack.Screen name={screenConstant.SignUp} component={SignUp} />
                <Stack.Screen name={screenConstant.ForgotPassword} component={ForgotPassword} />
                <Stack.Screen name={screenConstant.Formik} component={FormikTemp} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}