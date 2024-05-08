import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import * as Yup from 'yup';
import CustomButton from '../../components/Button/customButton';
import FormikTemplate from '../../components/FormikTemplate/formikTemplate';
import { screenConstant } from '../../constants';
import { styles } from './style';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string().email('Invalid email').required('Please enter email'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Invalid Password',
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    "Password doesn't match",
  ),
  number: Yup.number().min(10, 'Invalid number').required('Enter Number'),
});

// utils
export default function SignUp({ navigation }) {
  const signUpUser = async values => {
    try {
      let userCredentials = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      await userCredentials.user.updateProfile({
        displayName: values.firstName + ' ' + values.lastName,
      });
      // console.log(userCredentials,1)
      const notes = [
        {
          label: 'Personal',
          title: 'Meeting Notes',
          content: 'Discussion points: project updates, deadlines, action items',
        },
        {
          label: 'Academic',
          title: 'Meeting Notes',
          content: 'Discussion points: project updates, deadlines, action items',
        },
        {
          label: 'Work',
          title: 'Meeting Notes',
          content: 'Discussion points: project updates, deadlines, action items',
        }
        ,
        {
          label: 'Others',
          title: 'Meeting Notes',
          content: 'Discussion points: project updates, deadlines, action items',
        }
      ]
      const label = [
        'Personal',
        'Academic',
        'Work',
        'Others'
      ]

      const batch =  firestore().batch();
      const collectionRef =  firestore().collection('user');

     notes.forEach((doc) => {
        const newDocRef = firestore().collection('user').doc(userCredentials.user.uid).collection('notes').doc(); // Automatically generates a new document ID
        batch.set(newDocRef, doc);
      });

      label.forEach((doc) => {
        const newDocRef = collectionRef.doc(userCredentials.user.uid).collection('labels').doc(doc); // Automatically generates a new document ID
        batch.set(newDocRef, { count: 1 });
      });
      await batch.commit();


      // await firestore()
      //   .collection('user')
      //   .doc(userCredentials.user.uid)
      //   .collection('labels')
      //   .doc('Others')
      //   .set({ count: 1 });
      console.log('User account created & signed in!');
      navigation.navigate(screenConstant.Login);
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
            onSubmit={signUpUser}>
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
                <Text>
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
