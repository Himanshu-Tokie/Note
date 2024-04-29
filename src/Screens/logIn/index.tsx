import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomInput from "../../components/Button/input";
import { useState } from "react";
import CustomButton from "../../components/Button/customButton";
import { screenConstant } from "../../constants/Screen";
import * as Yup from 'yup'
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter email'),
    password:Yup.string().min(8).required('Please enter your password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Invalid Password')
  });
  
export default function LogIn({navigation}){
    const [user,SetUser] = useState('')
    const [password,SetPassword] = useState('')

    const logIn =()=>{
        navigation.navigate(screenConstant.Home)
    }

    const forgot =()=>{
        navigation.navigate(screenConstant.ForgotPassword)
    }
    return(
        <>
        <SafeAreaView>
            <View>
                <Formik 
                initialValues={{email:'',password:''}}
                validationSchema={SignupSchema}
                onSubmit={values=>{
                    console.log(values);
                    Alert.alert(JSON.stringify(values))
                }}>
                {({errors, touched, isValid,handleChange,values,setFieldTouched,handleSubmit})=>(
                    <View>
                        {/* <CustomInput text='Email' placeholder='email' setText={handleChange('email')} />
                        <CustomInput placeholder='password' setText={handleChange('password')} /> */}
                        <View>
                        <TextInput
                            placeholder="email"
                            autoCapitalize="none"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={()=>setFieldTouched('email')}
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
                            onBlur={()=>setFieldTouched('password')}
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
            <CustomButton text='Log In' onPress={logIn}/>
        </SafeAreaView>
        </>
    )
}