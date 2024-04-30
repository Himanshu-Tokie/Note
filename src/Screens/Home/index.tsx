import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/Button/customButton';
import Box from '../../components/homeBox/homeBox';
import { screenConstant } from '../../constants/Screen';


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
  const [label,setLabel] = useState([]);

  const getLabel = async () => {
    try {
      const snapShot = await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('labels')
        .get();
      const labelData = []
      snapShot.forEach(doc => {     
        labelData.push({ id:doc.id,count: doc.data().count })
      });
      setLabel(labelData);
      // console.log(label, 70);

    } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };
  useEffect(() => {
    getLabel();
    console.log('label fetced');
  }, []);
  return (
    <>
      <SafeAreaView>
        <View>
          <View>
            <Text>Welcome {user.displayName}</Text>
            <Text>Note Taking App</Text>
          </View>
          <View>
            <Image
              //   style={styles.image}
              source={{
                uri: {photoURL},
              }}></Image>
          </View>
          {label && <View>
            <FlatList
            data={label}
            numColumns={1}
            renderItem={({item}) => <Box text={item} nav={navigation} note={user.uid}></Box>}
          />
          </View>}
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
