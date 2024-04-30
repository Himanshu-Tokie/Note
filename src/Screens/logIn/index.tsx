import { default as auth } from '@react-native-firebase/auth';
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from 'yup';
import { screenConstant } from "../../constants/Screen";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter email'),
    password: Yup.string().min(8).required('Please enter your password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Invalid Password')
});

export default function LogIn({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [errorLogin,setErrorLogin] = useState(false)
    console.log(user,12);

    function onAuthStateChanged(user) {
        console.log(user,100);
        
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const logInUser = async (email,password) => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password)
            // const user_ = userCredential.user;
            console.log(userCredential,200);
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                console.log('User does not exist. Please register.');
                setErrorLogin(true);
            }
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
        }}

        const forgot = () => {
            navigation.navigate(screenConstant.ForgotPassword)
        }
        if (initializing) return null;
        if (!user) {
            return (
                <>
                    <SafeAreaView>
                        {errorLogin && (
                            <Text>Invalid Credentials</Text>
                        )}
                        <View>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                    console.log(values, 1);
                                    logInUser(values.email,values.password);
                                }}>
                                {({ errors, touched, isValid, handleChange, values, setFieldTouched, handleSubmit }) => (
                                    <View>
                                        {/* <CustomInput text='Email' placeholder='email' setText={handleChange('email')} />
                        <CustomInput placeholder='password' setText={handleChange('password')} /> */}
                                        <View>
                                            <TextInput
                                                placeholder="email"
                                                autoCapitalize="none"
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                                onBlur={() => setFieldTouched('email')}
                                            ></TextInput>
                                            {touched.email && errors.email && (
                                                <Text>{errors.email}</Text>
                                            )}
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder="password"
                                                autoCapitalize="none"
                                                value={values.password}
                                                onChangeText={handleChange('password')}
                                                onBlur={() => setFieldTouched('password')}
                                            ></TextInput>
                                            {touched.password && errors.password && (
                                                <Text>{errors.password}</Text>
                                            )}
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                disabled={!isValid}
                                            >
                                                <Text>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )}
                            </Formik>
                        </View>
                        <Text onPress={forgot}>Forget Password?</Text>
                        <Text>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
                        {/* <CustomButton text='Log In' onPress={logIn} /> */}
                    </SafeAreaView>
                </>
            )
        }
        else
        return navigation.navigate(screenConstant.Home,{user})
    }
