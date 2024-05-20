import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Label from "../../Screens/Labels";
import Note from "../../Screens/Note";
import Enter from "../../Screens/enter";
import ForgotPassword from "../../Screens/forgotPassword/forgotPass";
import LogIn from "../../Screens/logIn";
import SignUp from "../../Screens/signUp";
import Splash from "../../Screens/splashScreen1";
import { COLORS } from "../../constants/colors";
import { screenConstant } from "../../constants/index";
import { loadThemeFromStorage } from "../../store/theme";
import HomeNavigation from "../HomeNavigation";

export default function AuthNavigation() {
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadThemeFromStorage());
      }, [dispatch]);
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={screenConstant.Splash1}
                    screenOptions={{
                        headerStyle: { backgroundColor: COLORS.BACKGROUND },
                        headerTintColor: 'rgb(107, 78, 253)',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: 20
                        },
                    }}>
                        <Stack.Screen name={screenConstant.Splash1} component={Splash} options={{headerShown: false}}/>
                    <Stack.Screen name={screenConstant.Enter} component={Enter} options={{ headerShown: false }} />
                    <Stack.Screen name={screenConstant.Login} component={LogIn} />
                    <Stack.Screen name={screenConstant.HomeNavigation} component={HomeNavigation} options={{ headerShown: false }} />
                    <Stack.Screen name={screenConstant.Note} component={Note} options={{ headerShown: false }} />
                    <Stack.Screen name={screenConstant.SignUp} component={SignUp} />
                    <Stack.Screen name={screenConstant.ForgotPassword} component={ForgotPassword} />
                    <Stack.Screen name={screenConstant.Label} component={Label} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
