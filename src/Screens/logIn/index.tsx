import { default as auth } from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import * as Yup from 'yup';
import CustomButton from '../../components/Button/customButton';
import FormikTemplate from '../../components/FormikTemplate/formikTemplate';
import { screenConstant } from '../../constants';
import { styles } from './style';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter email'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Invalid Password',
    ),
});

export default function LogIn({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [errorLogin, setErrorLogin] = useState(false);
  console.log(user, 12);

  function onAuthStateChanged(user) {
    console.log(user, 100);

    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // console.log("asdfasdf");

    return subscriber; // unsubscribe on unmount
  }, []);

  const logInUser = async (email, password) => {
    try {
      console.log(email,password,18);
      
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      // const user_ = userCredential.user;
      // console.log(userCredential, 200);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        console.log('User does not exist. Please register.');
        setErrorLogin(true);
      }
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
    }
  };

  const forgot = () => {
    navigation.navigate(screenConstant.ForgotPassword);
  };
  if (initializing) return null;
  if (!user) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          {errorLogin && <Text>Invalid Credentials</Text>}
          <View style={styles.subContainer}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={SignupSchema}
              onSubmit={values => {
                console.log(values, 1);
                logInUser(values.email, values.password);
              }}>
              {({
                errors,
                touched,
                isValid,
                handleChange,
                values,
                setFieldTouched,
                handleSubmit,
              }) => (
                <View>
                  <FormikTemplate
                    placeholder="Email"
                    values={values.email}
                    touched={touched.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    error={errors.email}
                  />
                  <FormikTemplate
                    placeholder=""
                    values={values.password}
                    touched={touched.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    error={errors.password}
                  />

                  <Text onPress={forgot} style={styles.colorText}>
                    Forget Password?
                  </Text>
                  <Text>
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy.
                  </Text>
                  <CustomButton
                    text="Log In"
                    onPress={handleSubmit}
                    // disabled={!isValid}
                    style={[styles.button]}
                  />
                </View>
              )}
            </Formik>
          </View>
          {/* <CustomButton text='Log In' onPress={logIn} /> */}
        </SafeAreaView>
      </>
    );
  } else return navigation.navigate(screenConstant.Home, {user});
}
