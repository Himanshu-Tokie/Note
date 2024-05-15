import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import * as Yup from 'yup';
import { screenConstant } from '../constants';
import { logIn, updateUser } from '../store/common';

export const signUpUser = async (user, providerId,dispatch,navigation) => {
  try {
    console.log('new user Alert');
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
      },
      {
        label: 'Others',
        title: 'Meeting Notes',
        content: 'Discussion points: project updates, deadlines, action items',
      },
    ];
    const label = ['Personal', 'Academic', 'Work', 'Others'];
    const reminder = [];

    const batch = firestore().batch();
    const collectionRef = firestore().collection('user');

    notes.forEach((doc) => {
      const newDocRef = firestore()
        .collection('user')
        .doc(user.uid)
        .collection('notes')
        .doc(); // Automatically generates a new document ID
      batch.set(newDocRef, doc);
    });

    label.forEach((doc) => {
      const newDocRef = collectionRef
        .doc(user.uid)
        .collection('labels')
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
    [Yup.ref('password')],
    "Password doesn't match",
  ),
  number: Yup.number().min(10, 'Invalid number').required('Enter Number'),
});
