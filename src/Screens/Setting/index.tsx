import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import Search from '../../components/Header';
import { screenConstant } from '../../constants';
import { COLORS, DARK_COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { logIn, updateUser } from '../../store/common';
import { toggleTheme } from '../../store/theme';
import { styles } from './style';

export default function Setting({navigation}) {
  const user = auth().currentUser;
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const signOut = async () => {
    try {
      if (user?.providerData[0].providerId !== 'google.com') {
        await auth()
          .signOut()
          .then(() => console.log('User signed out!'))
          .catch(e => console.log(e));
        dispatch(logIn(false));
        dispatch(updateUser(null));
        await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(false));
        navigation.navigate(screenConstant.Enter);
      } else {
        try {
          await GoogleSignin.signOut().catch(e => console.log(e));
          dispatch(logIn(false));
          dispatch(updateUser(null));
          console.log('google log out');
          await AsyncStorage.setItem(
            STRINGS.IS_LOGGED_IN,
            JSON.stringify(false),
          ).then(() => console.log('success remove async'));
          navigation.navigate(screenConstant.Enter);
        } catch (error) {
          console.error(error);
        }
      }
      console.log('data removed to storage logout');
    } catch (e) {
      console.log(e);
    }
  };
  const colorScheme = useSelector(state => state.theme.theme);
  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              colorScheme === 'light'
                ? COLORS.BACKGROUND
                : DARK_COLORS.BACKGROUND,
          },
        ]}>
        <View>
          <Search headerText={STRINGS.SETTINGS} />
        </View>
        <View style={styles.subContainer}>
          <View
            style={[
              styles.box1,
              {
                backgroundColor:
                  colorScheme === 'light'
                    ? COLORS.SETTING_BOX
                    : DARK_COLORS.SETTING_BOX,
              },
            ]}>
            <View style={styles.view}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        colorScheme === 'light'
                          ? COLORS.TEXT1
                          : DARK_COLORS.TEXT1,
                    },
                  ]}>
                  Profile
                </Text>
              </View>
            </View>
            <View style={styles.view}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        colorScheme === 'light'
                          ? COLORS.TEXT1
                          : DARK_COLORS.TEXT1,
                    },
                  ]}>
                  {STRINGS.THEME}
                </Text>
              </View>
              <View>
                <ToggleSwitch
                  isOn={theme === 'dark'}
                  onColor="black"
                  circleColor={COLORS.BACKGROUND1}
                  offColor="white"
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size="medium"
                  onToggle={() => dispatch(toggleTheme())}
                />
              </View>
            </View>
            <View style={styles.view}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        colorScheme === 'light'
                          ? COLORS.TEXT1
                          : DARK_COLORS.TEXT1,
                    },
                  ]}>
                  Change Password
                </Text>
              </View>
            </View>
          </View>
          {/* Other settings items */}
          <TouchableOpacity onPress={signOut}>
            <View
              style={[
                styles.box1,
                styles.box2,
                {
                  backgroundColor:
                    colorScheme === 'light'
                      ? COLORS.SETTING_BOX
                      : DARK_COLORS.SETTING_BOX,
                },
              ]}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      colorScheme === 'light'
                        ? COLORS.TEXT1
                        : DARK_COLORS.TEXT1,
                  },
                  styles.textBold,
                ]}>
                {STRINGS.SIGN_OUT}
              </Text>
              {/* </View> */}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
