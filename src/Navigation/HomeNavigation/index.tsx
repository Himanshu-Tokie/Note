import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Home from '../../Screens/Home';
import Note from '../../Screens/Note';
import Setting from '../../Screens/Setting';
import Extar1 from '../../Screens/extra1';
import Extar2 from '../../Screens/extra2';
import Icon from '../../components/Icon';
import Plus from '../../components/Plus/Plus';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { styles } from './style';

export default function HomeNavigation() {
  const parentNavigation = useNavigation();
  const Tab = createBottomTabNavigator();

  function MyTabBar({ state, descriptors, navigation }) {
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
    return (
      <View style={styles.footer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
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
                parentNavigation.navigate(screenConstant.Note, { note });
              } else {
                parentNavigation.navigate(screenConstant.Note);
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
              icon={!isFocused?iconSelection(index):iconHover(index)}
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
        screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={screenConstant.Home}
          component={Home}
        />
        <Tab.Screen
          name={screenConstant.Extra1}
          component={Extar1}
        />
        <Tab.Screen name={screenConstant.Note} component={Note} />
        <Tab.Screen
          name={screenConstant.Extra2}
          component={Extar2}
          initialParams={{ parentNavigation }}
        />
        <Tab.Screen name={screenConstant.Setting} component={Setting} />
      </Tab.Navigator>
    </>
  );
}
