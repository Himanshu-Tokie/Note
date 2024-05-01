import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

export default function CustomButton({text, onPress, disabled = false, style}) {
  // console.log(text);
  const customstyles = style ?? [];
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, ...customstyles]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
