import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { screenConstant } from '../../constants';


function isErrorWithCode(error) {
  return error.code !== undefined;
}

export default function Google() {
  const navigation = useNavigation();
    GoogleSignin.configure({
        webClientId: '963157051833-gu56ol8ut09e2dsp3s1mcd43abdp8ifb.apps.googleusercontent.com', 
    })  
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('hello');
      // setState({userInfo, error: undefined});
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const ans = await auth().signInWithCredential(googleCredential);
      if(ans.additionalUserInfo?.isNewUser)
      signUpUser(ans.user);
    else{
      navigation.navigate(screenConstant.Home);
    }     

    } catch (error) {
      console.log(error);
      
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  const signUpUser = async (user) => {
    try {
      // console.log(1)
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
        const newDocRef = firestore().collection('user').doc(user.uid).collection('notes').doc(); // Automatically generates a new document ID
        batch.set(newDocRef, doc);
      });

      label.forEach((doc) => {
        const newDocRef = collectionRef.doc(user.uid).collection('labels').doc(doc); // Automatically generates a new document ID
        batch.set(newDocRef, { count: 1 });
      });
      await batch.commit();

      navigation.navigate(screenConstant.Home);
      console.log('User account created & signed in! Google');
    } catch (error) {
      console.error('Error creating account:', error.code, error.message);
    }
  };

  return (
    <>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
        disabled={false}
        style={styles.google}
      />
    </>
  );
}
const styles = StyleSheet.create({
  google: {
    borderRadius: 30,
    width: 310,
    alignContent: 'center',
    alignItems: 'center',
    // textAlign:
    // paddingTop:10
  },
});
