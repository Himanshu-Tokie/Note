import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { logIn, updateUser } from '../../store/common';
import { signUpUser } from '../../utils';

function isErrorWithCode(error) {
  return error.code !== undefined;
}

export default function Google() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '963157051833-a1elv0njn1tu58p9fjnfe8277bi2aj6c.apps.googleusercontent.com',
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn().catch(e => {
        console.log(e);
      });
      // console.log(userInfo);
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const ans = await auth().signInWithCredential(googleCredential);
      console.log(ans);
      console.log('google sign in successful');

      if (ans.additionalUserInfo?.isNewUser) {
        console.log('welcome new user');
        signUpUser(ans.user, 'google.com', dispatch, navigation);
      } else {
        console.log('your are not welcome');

        dispatch(logIn(true));
        dispatch(updateUser({uid: ans.user.uid, providerId: 'google.com'}));
        await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(true)).catch(e =>
          console.log(e),
        );
        console.log('data added to storage google');
        navigation.navigate(screenConstant.HomeNavigation);
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

  return (
    <>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
        disabled={false}
        style={styles.google}
  /> */}
      <View style={styles.google}>
        <TouchableOpacity onPress={_signIn}>
          <View style={styles.googleContainer}>
            {ICONS.GOOGLE(
              heightPercentageToDP('2%'),
              heightPercentageToDP('2%'),
              'none',
            )}
            <Text style={styles.text}>{STRINGS.GOOGLE_SIGN_IN}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  google: {
    paddingTop: heightPercentageToDP('1%'),
  },
  googleContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'white',
    width: widthPercentageToDP('82%'),
    padding: widthPercentageToDP('4%'),
    alignContent: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    fontSize: heightPercentageToDP('2%'),
    paddingLeft: widthPercentageToDP('2.5%'),
    color: COLORS.GOOGLE,
    fontWeight: 'bold',
  },
});
