import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from './style';
export default function Setting({navigation}) {
  const user = auth().currentUser;
  console.log(JSON.stringify(user.uid));

  let signOut;
  if (user?.providerData[0].providerId !== 'google.com') {
    signOut = async () => {
      await auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      navigation.popToTop();
    };
  } else {
    signOut = async () => {
      try {
        await GoogleSignin.signOut();
        navigation.popToTop();
        //   setState({ user: null }); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    };
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.view}>
            <View>
              <Text style={styles.text}>Theme</Text>
            </View>
            <View>
              <Text style={styles.text}>Light</Text>
            </View>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>Reset Password</Text>
          </View>
          {
            user?.providerData[0].providerId !== 'google.com' &&

          <View style={styles.view}>
            <Text style={styles.text}>Update Image</Text>
          </View>
          }
          <View style={styles.view}>
            <Text style={styles.text}>Version</Text>
            <Text style={styles.text}>1.0</Text>
          </View>
          <View style={styles.view}>
            <Text onPress={signOut} style={[styles.text, styles.textBold]}>
              Sign Out
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}