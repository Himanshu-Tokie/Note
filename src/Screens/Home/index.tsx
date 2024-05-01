import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import CustomButton from '../../components/Button/customButton';
import CustomText from '../../components/Text/customText';
import Box from '../../components/homeBox/homeBox';
import { screenConstant } from '../../constants/Screen';
import { styles } from './style';
export default function Home({navigation, route}) {
  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.popToTop();
  };
  const user = route.params.user;
  const photoURL = user.photoURL;
  // console.log(user);
  const addNote = () => {
    navigation.navigate(screenConstant.Note, {uid: user.uid});
  };
  const [label, setLabel] = useState();

  const getLabel = async () => {
    try {
      const snapShot = await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('labels')
        .get();
      const labelData = [];
      snapShot.forEach(doc => {
        labelData.push({id: doc.id, count: doc.data().count});
      });
      setLabel(labelData);
      console.log(label, 70);
    } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };

  useEffect(() => {
    getLabel();
    console.log('mounted home');

    return console.log('unmount home');
  }, []);
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.header}>
            <View>
              <CustomText
                text={'Welcome' + ', ' + user.displayName + '!'}
                styles={[styles.welcome]}
              />
              <CustomText text="Note Taking App" styles={[styles.welcome]} />
            </View>
            <View>
              {/* <Image
                //   style={styles.image}
                source={{
                  uri: {photoURL},
                }}></Image> */}
            </View>
          </View>
          <View>
            {/* <ImageBackground
              source={image}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>Inside</Text>
            </ImageBackground> */}
            {/* <SVGImg width={100} height={100} /> */}
          </View>
          {label && (
            <View>
              <FlatList
                data={label}
                numColumns={1}
                renderItem={({item}) => (
                  <Box text={item} nav={navigation} note={user.uid}></Box>
                )}
              />
            </View>
          )}
          <View>
            {/* add note */}
            <CustomButton text="Add Note" onPress={addNote} />
          </View>
        </View>
        <Button title="SignOut" onPress={signOut} />
      </SafeAreaView>
    </>
  );
}

const styl = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
