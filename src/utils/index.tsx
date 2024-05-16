import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import * as Yup from 'yup';
import { screenConstant } from '../constants';
import { STRINGS } from '../constants/strings';
import { logIn, updateUser } from '../store/common';

export const signUpUser = async (user, providerId,dispatch,navigation) => {
  try {
    console.log('new user Alert');
    const notes = [
      {
        label: STRINGS.TEMP_LABEL_1,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT
      },
      {
        label: STRINGS.TEMP_LABEL_2,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT
      },
      {
        label: STRINGS.TEMP_LABEL_3,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT
      },
      {
        label: STRINGS.TEMP_LABEL_4,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT
      },
    ];
    const label = [STRINGS.TEMP_LABEL_1, STRINGS.TEMP_LABEL_2, STRINGS.TEMP_LABEL_3, STRINGS.TEMP_LABEL_4];
    const reminder = [];

    const batch = firestore().batch();
    const collectionRef = firestore().collection(STRINGS.FIREBASE.USER);

    notes.forEach((doc) => {
      const newDocRef = firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(); // Automatically generates a new document ID
      batch.set(newDocRef, doc);
    });

    label.forEach((doc) => {
      const newDocRef = collectionRef
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.LABELS)
        .doc(doc); // Automatically generates a new document ID
      batch.set(newDocRef, { count: 1 });
    });
    await batch.commit();
    dispatch(logIn(true));
    dispatch(
      updateUser({
        uid: user.uid,
        providerId: providerId,
      })
    );
    await AsyncStorage.setItem('isLogedIn', JSON.stringify(true))
        navigation.navigate(screenConstant.Home);
    console.log('User account created & signed in! Google');
  } catch (error) {
    console.error('Error creating initial database:', error.code, error.message);
  }
};

export const SignupSchema = Yup.object().shape({
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
    [Yup.ref(STRINGS.PASSWORD_SMALL)],
    "Password doesn't match",
  ),
  number: Yup.number().min(10, 'Invalid number').required('Enter Number'),
});
