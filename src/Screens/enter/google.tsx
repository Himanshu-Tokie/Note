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
import { useDispatch } from 'react-redux';
import { logIn, updateUser } from '../../store/common';
import { signUpUser } from '../../utils';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


function isErrorWithCode(error) {
  return error.code !== undefined;
}

export default function Google() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId: '963157051833-gu56ol8ut09e2dsp3s1mcd43abdp8ifb.apps.googleusercontent.com',
  })

  const _signIn = async () => {
    try 
    {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const ans = await auth().signInWithCredential(googleCredential);
      console.log(ans);
      
      if (ans.additionalUserInfo?.isNewUser)
        signUpUser(ans.user,"google.com");
      else {
        dispatch(logIn(true))
        dispatch(updateUser({uid:ans.user.uid,
          providerId:"google.com",
        }))
        navigation.navigate(screenConstant.Home);
      }
    } 
    catch (error) 
    {
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
    textAlign:'center',
    width:widthPercentageToDP('82%'),
    alignContent: 'center',
    alignItems: 'center',
    // textAlign:.
    marginTop:heightPercentageToDP('1'),
    paddingTop:10,
    // backgroundColor:'rgb(249, 248, 253)',
  },
  // wideSize: { width: 350, height: 48 }
});
