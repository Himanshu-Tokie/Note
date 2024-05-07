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
  GoogleSignin.configure();
  const _signIn = async () => {
    console.log('hello');

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({userInfo, error: undefined});
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const ans = await auth().signInWithCredential(googleCredential);
      // console.log(JSON.stringify(ans));
      // console.log(ans.user.uid);
      if(ans.additionalUserInfo?.isNewUser)
      signUpUser(ans.user);
    else{
      navigation.navigate(screenConstant.Home);
    }
      

    } catch (error) {
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
      // console.log(userCredentials,1)
      await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('notes')
        .add({
          label: 'others',
          title: 'Meeting Notes',
          content:
            'Discussion points: project updates, deadlines, action items',
        });
      await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('labels')
        .doc('others')
        .set({count: 1});
      navigation.navigate(screenConstant.Home);
      console.log('User account created & signed in!');
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
