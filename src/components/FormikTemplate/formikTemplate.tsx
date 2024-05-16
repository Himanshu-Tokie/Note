import { useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ICONS } from '../../constants/Icons';
import { styles } from './style';

export default function FormikTemplate({
  placeholder,
  values,
  touched,
  onChangeText,
  onBlur,
  error,
  logIn = true
}) {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [show, setShow] = useState(true);
  useMemo(()=>{

    if (
      (placeholder === 'Password' || placeholder === 'Confirm Password') &&
      show
    ) {
      setSecureTextEntry(true);
      setShow(false);
    }
  },[placeholder])
    const onPress = () => {
    setSecureTextEntry(!secureTextEntry);
    setShow(!show);
  };
  return (
    <View style={styles.container}>
      {placeholder && <Text style={styles.label}>{placeholder}</Text>}
      <View style={styles.eye}>
        <TextInput
          placeholder={placeholder}
          autoCapitalize="none"
          value={values}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          style={{flex:1}}
        />
        {(placeholder === 'Password' || placeholder === 'Confirm Password') && (
          <TouchableOpacity onPress={onPress}>{ICONS.EYE(heightPercentageToDP('2.2'), heightPercentageToDP('2.2'), 'none')}</TouchableOpacity>
        )}
      </View>
      {touched && error &&(logIn)&& <Text style={styles.error}>*{error}</Text>}
    </View>
  );
}
