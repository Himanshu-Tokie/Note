import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomInput from "../../components/Button/input";
import { useState } from "react";
import CustomButton from "../../components/Button/customButton";
import { Formik } from "formik";
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Invalid email').required('Please enter email'),
    password: Yup.string().min(8).required('Please enter your password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Invalid Password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match"),
    number: Yup.number().min(10, 'Invalid number').required('Enter Number').max(10)
});

export default function SignUp({ navigation }) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const signUp = () => {

    }
    return (
        <>
            <SafeAreaView>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        number: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {console.log(values)}}
                >
                    {({ handleSubmit, touched, isValid, values, setFieldTouched, handleChange, errors }) => (
                        <View>
                            <View>
                                <TextInput
                                    placeholder="First Name"
                                    autoCapitalize="words"
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    onBlur={() => setFieldTouched('firstName')}
                                ></TextInput>
                                {touched.firstName && errors.firstName && (
                                    <Text>{errors.firstName}</Text>
                                )}
                            </View>
                            <View>
                                <TextInput
                                    placeholder="Last Name"
                                    autoCapitalize="words"
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={() => setFieldTouched('lastName')}
                                ></TextInput>
                                {touched.lastName && errors.lastName && (
                                    <Text>{errors.lastName}</Text>
                                )}
                            </View>
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
                                <TextInput
                                    placeholder="confirm password"
                                    autoCapitalize="none"
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={() => setFieldTouched('confirmPassword')}
                                ></TextInput>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text>{errors.confirmPassword}</Text>
                                )}
                            </View>
                            <View>
                                <TextInput
                                    placeholder="Phone Number"
                                    keyboardType="number-pad"
                                    value={values.number}
                                    onChangeText={handleChange('number')}
                                    onBlur={() => setFieldTouched('number')}
                                ></TextInput>
                                {touched.number && errors.number && (
                                    <Text>{errors.number}</Text>
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
                {/* <CustomInput text='Name' placeholder='Name' setText={setName} />
        <CustomInput text='Email' placeholder='email' setText={setName} />
        <CustomInput text='Password' placeholder='Password' setText={setName} />
        <CustomInput text='Confirm Password' placeholder='Confirm Password' setText={setName} />
        <Text>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
        <CustomButton text='Sign Up' onPress={signUp} /> */}
            </SafeAreaView>
        </>
    )
}