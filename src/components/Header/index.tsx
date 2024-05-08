import { useNavigation } from '@react-navigation/native';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ICONS } from '../../constants/Icons';
import Icon from '../Icon';

export default function Header({
  onChangeText,
  notesData,
  setSearchData,
  headerText,
}) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.leftHeader}>
            {ICONS.BACK(23, 23, 'none')}
            {/* <Icon icon={ICONS.BACK} height={23} width={23} color='none' /> */}
            <Text style={styles.text}>Back</Text>
          </View>
        </Pressable>
        <View>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
        <View style={styles.rightHeader}>
        {setSearchData &&
          <TouchableOpacity style={styles.searchContainer}>
            <Icon
              icon={ICONS.SEARCH}
              height={23}
              width={23}
              color="none"
              style={styles.iconContainer}
            />
            <TextInput
              style={styles.text}
              placeholder="Search"
              placeholderTextColor="rgb(107,78,253)"
              onChangeText={onChangeText}
              onBlur={() => setSearchData(notesData)}
            />
          </TouchableOpacity>}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    marginHorizontal: 8,
  },
  headerText: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  leftHeader: {
    flexDirection: 'row',
  },
  rightHeader: {
    width: 100,
  },
  text: {
    fontSize: 16,
    color: 'rgb(107,78,253)',
    paddingLeft: 0,
    paddingTop: 2,
  },
  iconContainer: {
    paddingRight: 5,
  },
});
