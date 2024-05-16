import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Search from '../../components/Header';
import { screenConstant } from '../../constants';
import { STRINGS } from '../../constants/strings';
import { logIn, updateUser } from '../../store/common';
import { styles } from './style';

export default function Setting({navigation}) {
  const user = auth().currentUser;
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      if (user?.providerData[0].providerId !== 'google.com') {
        await auth()
          .signOut()
          .then(() => console.log('User signed out!')).catch(e=>console.log(e));
        dispatch(logIn(false));
        dispatch(updateUser(null));
        await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(false));
        navigation.navigate(screenConstant.Enter);
        // navigation.navigate(screenConstant.Enter);
      } else {
        try {
          await GoogleSignin.signOut().catch(e=>console.log(e));;
          dispatch(logIn(false));
          dispatch(updateUser(null));
          console.log('google log out');
          await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(false)).then(()=>console.log('success remove async'));
          navigation.navigate(screenConstant.Enter);
          // navigation.popToTop();
          //   setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      }
      console.log('data removed to storage logout');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Search
            // onChangeText={search}
            // notesData={notesData}
            headerText={STRINGS.SETTINGS}
          />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.view}>
            <View>
              <Text style={styles.text}>{STRINGS.THEME}</Text>
            </View>
            <View>
              <Text style={styles.text}>{STRINGS.LIGHT}</Text>
            </View>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{STRINGS.RESET_PASSWORD}</Text>
          </View>
          {user?.providerData[0].providerId !== 'google.com' && (
            <View style={styles.view}>
              <Text style={styles.text}>{STRINGS.UPDATE_IMAGE}</Text>
            </View>
          )}
          <View style={styles.view}>
            <Text style={styles.text}>{STRINGS.VERSION}</Text>
            <Text style={styles.text}>1.0</Text>
          </View>
          <View style={styles.view}>
            <Text onPress={signOut} style={[styles.text, styles.textBold]}>
              {STRINGS.SIGN_OUT}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
