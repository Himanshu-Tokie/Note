import { default as auth } from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/Button/customButton';
import FormikTemplate from '../../components/FormikTemplate/formikTemplate';
import withTheme from '../../components/HOC';
import { STRINGS } from '../../constants/strings';
import { SignupSchema, signUpUser } from '../../utils';
import { styles } from './style';

// utils
function SignUp({ navigation,theme }) {
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
  const THEME = theme 

  return (
    <>
      <SafeAreaView style={[styles.container,{backgroundColor:THEME.BACKGROUND}]}>
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
                      placeholder={STRINGS.FIRST_NAME}
                      values={values.firstName}
                      touched={touched.firstName}
                      onChangeText={handleChange(STRINGS.FIRST_NAME_SMALL)}
                      onBlur={() => setFieldTouched(STRINGS.FIRST_NAME_SMALL)}
                      error={errors.firstName}
                    />
                    <FormikTemplate
                      placeholder={STRINGS.LAST_NAME}
                      values={values.lastName}
                      touched={touched.lastName}
                      onChangeText={handleChange(STRINGS.LAST_NAME_SMALL)}
                      onBlur={() => setFieldTouched(STRINGS.LAST_NAME_SMALL)}
                      error={errors.lastName}
                    />
                    <FormikTemplate
                      placeholder={STRINGS.EMAIL}
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
                      onChangeText={handleChange(STRINGS.PASSWORD_SMALL)}
                      onBlur={() => setFieldTouched(STRINGS.PASSWORD_SMALL)}
                      error={errors.password}
                    />
                    <FormikTemplate
                      placeholder={STRINGS.CONFIRM_PASSWORD}
                      values={values.confirmPassword}
                      touched={touched.confirmPassword}
                      onChangeText={handleChange(STRINGS.CONFIRM_PASSWORD_SMALL)}
                      onBlur={() => setFieldTouched(STRINGS.CONFIRM_PASSWORD_SMALL)}
                      error={errors.confirmPassword}
                    />
                    <FormikTemplate
                      placeholder={STRINGS.PHONE_NUMBER}
                      values={values.number}
                      touched={touched.number}
                      onChangeText={handleChange(STRINGS.PHONE_NUMBER_SMALL)}
                      onBlur={() => setFieldTouched(STRINGS.PHONE_NUMBER_SMALL)}
                      error={errors.number}
                    />
                    <Text style={[styles.text,{color:THEME.TEXT1}]}>
                      {STRINGS.SIGN_UP_CONDITIONS}
                    </Text>
                    <CustomButton
                      text={STRINGS.SUBMIT}
                      onPress={handleSubmit}
                      disabled={!isValid}
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

export default withTheme(SignUp)