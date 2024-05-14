import { default as auth } from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/Button/customButton';
import FormikTemplate from '../../components/FormikTemplate/formikTemplate';
import { SignupSchema, signUpUser } from '../../utils';
import { styles } from './style';

// utils
export default function SignUp({ navigation }) {
  const dispatch = useDispatch()
  const signUp = async values => {
    try {
      let userCredentials = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      await userCredentials.user.updateProfile({
        displayName: values.firstName + ' ' + values.lastName,
      });
      // console.log(userCredentials,1)
      signUpUser(userCredentials.user,'firebase',dispatch,navigation)
    } catch (error) {
      console.error('Error creating account:', error.code, error.message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>

            <View style={styles.subContainer}>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  number: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={signUp}>
                {({
                  handleSubmit,
                  touched,
                  isValid,
                  values,
                  setFieldTouched,
                  handleChange,
                  errors,
                }) => (
                  <View>
                    <FormikTemplate
                      placeholder="First Name"
                      values={values.firstName}
                      touched={touched.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={() => setFieldTouched('firstName')}
                      error={errors.firstName}
                    />
                    <FormikTemplate
                      placeholder="Last Name"
                      values={values.lastName}
                      touched={touched.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={() => setFieldTouched('lastName')}
                      error={errors.lastName}
                    />
                    <FormikTemplate
                      placeholder="Email"
                      values={values.email}
                      touched={touched.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      error={errors.email}
                    />
                    <FormikTemplate
                      placeholder="Password"
                      values={values.password}
                      touched={touched.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      error={errors.password}
                    />
                    <FormikTemplate
                      placeholder="Confirm Password"
                      values={values.confirmPassword}
                      touched={touched.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={() => setFieldTouched('confirmPassword')}
                      error={errors.confirmPassword}
                    />
                    <FormikTemplate
                      placeholder="Phone Number"
                      values={values.number}
                      touched={touched.number}
                      onChangeText={handleChange('number')}
                      onBlur={() => setFieldTouched('number')}
                      error={errors.number}
                    />
                    <Text style={{color:'rgb(9,9,10)'}}>
                      By continuing, you agree to our Terms of Service and Privacy
                      Policy.
                    </Text>
                    <CustomButton
                      text="Submit"
                      onPress={handleSubmit}
                      disabled={!isValid}
                      style={[styles.button]}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
