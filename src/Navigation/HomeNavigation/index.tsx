import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Home from '../../Screens/Home';
import Note from '../../Screens/Note';
import Setting from '../../Screens/Setting';
import Extar1 from '../../Screens/extra1';
import Extar2 from '../../Screens/extra2';
import AddLabel from '../../components/AddLabel/addLabel';
import Icon from '../../components/Icon';
import Plus from '../../components/Plus/Plus';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { COLORS, DARK_COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { styles } from './style';

export default function HomeNavigation() {
  const parentNavigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const colorScheme = useSelector(state => state.theme.theme);
  const [show, setShow] = useState(false);
  const [labelData, setLabelData] = useState([]);
  const user = auth().currentUser;
  let uid = user?.uid;
  useEffect(() => {
    const fetchLabelData = async () => {
      try {
        await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .get()
          .then(labelData => setLabelData(labelData));
      } catch (e) {
        console.log(e, 12);
      }
    };
    fetchLabelData();
    const unsubscribe = firestore()
    .collection(STRINGS.FIREBASE.USER)
    .doc(uid)
    .collection(STRINGS.FIREBASE.LABELS)
    .onSnapshot(querySnapshot => {
      setLabelData(querySnapshot)
    });
  
  // Stop listening for updates when no longer required
  return () => unsubscribe();
  }, [uid]);
  function MyTabBar({state, descriptors, navigation}) {
    const iconSelection = index => {
      switch (index) {
        case 0:
          return ICONS.DOC;
        case 1:
          return ICONS.CHECKS;
        case 3:
          return ICONS.BELL;
        case 4:
          return ICONS.SETTING;
      }
    };
    const iconSelectionDark = index => {
      switch (index) {
        case 0:
          return ICONS.DOC_DARK;
        case 1:
          return ICONS.CHECKS_DARK;
        case 3:
          return ICONS.BELL_DARK;
        case 4:
          return ICONS.SETTINGS_DARK;
      }
    };
    const iconHover = index => {
      switch (index) {
        case 0:
          return ICONS.DOC_BLACK;
        case 1:
          return ICONS.CHECKS_BLACK;
        case 3:
          return ICONS.BELL_BLACK;
        case 4:
          return ICONS.SETTING_BLACK;
      }
    };
    const iconHoverDark = index => {
      switch (index) {
        case 0:
          return ICONS.DOC_BLACK_DARK;
        case 1:
          return ICONS.CHECKS_BLACK_DARK;
        case 3:
          return ICONS.BELL_BLACK_DARK;
        case 4:
          return ICONS.SETTINGS_BLACK_DARK;
      }
    };
    return (
      <View
        style={[
          styles.footer,
          {
            backgroundColor:
              colorScheme === 'light' ? COLORS.FOOTER : DARK_COLORS.FOOTER,
          },
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (index === 2) {
              // Check if the "Note" tab is clicked
              if (state.index == 3) {
                const note = {
                  timestamp: '',
                  newReminder: '',
                };
                parentNavigation.navigate(screenConstant.Note, {note});
              } else if (state.index == 1) {
                // console.log('add label',234423);
                setShow(true);
                console.log(uid);

                // return (<AddLabel uid={uid} setShow={setShow} show={show}/>)
              } else {
                parentNavigation.navigate(screenConstant.Note, {labelData});
              } // Use the parent navigation to navigate to the "Note" screen
            } else {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }
          };
          if (index == 2) {
            return <Plus onPress={onPress}></Plus>;
          }
          return (
            <Icon
              icon={
                !isFocused
                  ? colorScheme === 'light'
                    ? iconSelection(index)
                    : iconSelectionDark(index)
                  : colorScheme === 'light'
                  ? iconHover(index)
                  : iconHoverDark(index)
              }
              width={24}
              height={24}
              color="none"
              action={onPress}
              borderColor={''}
            />
          );
        })}
      </View>
    );
  }
  return (
    <>
      <Tab.Navigator
        initialRouteName={screenConstant.Home}
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name={screenConstant.Home} component={Home} />
        <Tab.Screen name={screenConstant.Extra1} component={Extar1} />
        <Tab.Screen name={screenConstant.Note} component={Note} />
        <Tab.Screen
          name={screenConstant.Extra2}
          component={Extar2}
          initialParams={{parentNavigation}}
        />
        <Tab.Screen name={screenConstant.Setting} component={Setting} />
      </Tab.Navigator>
      {show && <AddLabel uid={uid} setShow={setShow} show={show} />}
    </>
  );
}
