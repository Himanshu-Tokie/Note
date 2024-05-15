import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { screenConstant } from '../../constants';
import { logIn, updateUser } from '../../store/common';
import { signUpUser } from '../../utils';


function isErrorWithCode(error) {
  return error.code !== undefined;
}

export default function Google() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId: '963157051833-a1elv0njn1tu58p9fjnfe8277bi2aj6c.apps.googleusercontent.com',
  })

  const _signIn = async () => {
    try 
    {
      
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn().catch((e)=>{console.log(e);
      });
      // console.log(userInfo);
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const ans = await auth().signInWithCredential(googleCredential);
      console.log(ans);
      console.log('google sign in successful');
      
      if (ans.additionalUserInfo?.isNewUser)
        {console.log('welcome new user');
        signUpUser(ans.user,"google.com",dispatch,navigation);}
      else {
        console.log('your are not welcome');
        
        dispatch(logIn(true))
        dispatch(updateUser({uid:ans.user.uid,
          providerId:"google.com",
        }))
        await AsyncStorage.setItem('isLogedIn', JSON.stringify(true))
        .catch((e)=>console.log(e));
        console.log('data added to storage google');
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
