import { Text, TextInput, View } from 'react-native';
import { styles } from './style';

export default function FormikTemplate({
  placeholder,
  values,
  touched,
  onChangeText,
  onBlur,
  error
}) {
  return (

      <View style={styles.container}>
        {placeholder && 
        <Text style={styles.label}>{placeholder}</Text>}
        <TextInput
          placeholder={placeholder}
          autoCapitalize="none"
          value={values}
          onChangeText={onChangeText}
          onBlur={onBlur} />
        {touched && error && (
          <Text style={styles.error}>*{error}</Text>
        )}
      </View>

  );
}
