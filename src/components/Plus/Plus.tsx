import { TouchableOpacity, View } from 'react-native';
import { ICONS } from '../../constants/Icons';
import { styles } from './style';

export default function Plus({onPress}) {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          {ICONS.ADD(32,32)}
        </View>
      </TouchableOpacity>
    </>
  );
}


