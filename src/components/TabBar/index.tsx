import { View } from "react-native";
import { ICONS } from "../../Constants/Icons";
import { SCREEN_CONSTANTS } from "../../Constants";
import Icon from "../Icon";
import Plus from "../Plus/Plus";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import withTheme from "../HOC";

function MyTabBar({state, descriptors, navigation, parentNavigation,theme,setShow,labelData}) {
    const colorScheme = useSelector(state=>state.theme.theme)
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
              theme.FOOTER,
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
                parentNavigation.navigate(SCREEN_CONSTANTS.Note, {note});
              } else if (state.index == 1) {
                // console.log('add label',234423);
                setShow(true);
                // console.log(uid);

                // return (<AddLabel uid={uid} setShow={setShow} show={show}/>)
              } else {
                parentNavigation.navigate(SCREEN_CONSTANTS.Note, {labelData});
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
          else
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

  export default withTheme(MyTabBar)