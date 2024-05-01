import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { StyleSheet } from 'react-native';
  function isErrorWithCode(error) {
    return error.code !== undefined;
  }
  
  export default function Google({setState}) {
    GoogleSignin.configure();
    const _signIn = async () => {
      console.log('hello');
      
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        setState({userInfo, error: undefined});
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
         const ans = await auth().signInWithCredential(googleCredential);
         console.log(JSON.stringify(ans))
        
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
  
    return (
      <>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
        disabled={true}
        // style={styles.google}
        />
        </>
    );
  }
const styles = StyleSheet.create({
  google:{
    borderRadius:30,
    width:300,
    alignContent:'center',
    alignItems:'center'
  }
})
  