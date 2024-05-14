import { default as auth } from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CustomButton from '../../components/Button/customButton';
import FormikTemplate from '../../components/FormikTemplate/formikTemplate';
import { screenConstant } from '../../constants';
import { logIn, updateUser } from '../../store/common';
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
  // const [initializing, setInitializing] = useState(true);
  const isLogedIn = useSelector(state => state.common.isLogedIn);
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState(false);
  function onAuthStateChanged(user) {
    console.log(user, 101);
    if (!isLogedIn && user) {
      dispatch(logIn(true));
      dispatch(updateUser({uid: user.uid, providerId: 'firebase'}));
    }

    // if (initializing) setInitializing(false);
  }
  console.log(isLogedIn, 1234);

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  const logInUser = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('login complete');
      dispatch(logIn(true));
      dispatch(updateUser({uid: user.uid, providerId: 'firebase'}));
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        console.log('User does not exist. Please register.');
        setErrorLogin(true);
      }
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const forgot = () => {
    navigation.navigate(screenConstant.ForgotPassword);
  };

  // if (initializing) return null;
  if (!isLogedIn) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          {errorLogin && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Invalid Credentials</Text>
            </View>
          )}
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
                    logIn={false}
                  />
                  <FormikTemplate
                    placeholder="Password"
                    values={values.password}
                    touched={touched.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    error={errors.password}
                    logIn={false}
                  />

                  <Text onPress={forgot} style={styles.colorText}>
                    Forget Password?
                  </Text>
                  <Text style={{color: 'rgb(9,9,10)'}}>
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
  } else return navigation.navigate(screenConstant.Home);
}
