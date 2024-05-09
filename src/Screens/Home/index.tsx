import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-virtualized-view';
import LabelTemplate from '../../components/labelTemplate/labelTemplate';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { images } from '../../constants/Images';
import { styles } from './style';

export default function Home({navigation, route}) {
  const user = auth().currentUser;
  const image = 'https://legacy.reactjs.org/logo-og.png';
  const photoURL = user.photoURL?? image;
  // console.log(user);
  const addNote = () => {
    navigation.navigate(screenConstant.Note, {uid: user.uid});
  };
  const [label, setLabel] = useState();
  
  useEffect(() => {
    getLabel();
    // console.log('mounted home');
    // return console.log('unmount home');
  }, []);
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


  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcome}>
                {'Welcome' + ', ' + user.displayName + '!'}
              </Text>
              <Text style={styles.NoteTaking}>Note-Taking App</Text>
            </View>
            <View style={styles.innerHeader}>
              <View style={styles.icon}>{ICONS.BELL(24, 24, 'white')}</View>
              <Image
                //   style={styles.image}
                source={{
                  uri: photoURL,
                  height: RFValue(45),
                  width: RFValue(45),
                }}></Image>
            </View>
          </View>
          <ScrollView>

          <View style={styles.imageContainer}>
            <ImageBackground
              source={images.HOME}
              // resizeMode="cover"
              style={styles.image}>
              <View style={styles.imageInner}>
                {ICONS.PIECHART(68, 68, 'none')}
                <View style={{paddingLeft:28}}>
                  <Text style={styles.text}>Available Space</Text>
                  <Text style={styles.size}>20 .254 GB of 25 GB Used</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          {label && (
            <View style={styles.labels}>
              <FlatList
                data={label}
                numColumns={2}
                // numColumns={2}
                renderItem={({item}) => (
                  <LabelTemplate
                  icon={ICONS.OTHERS}
                  text={item.id}
                  files={item.count}
                  nav={navigation}
                  note={user.uid}></LabelTemplate>
                )}
                />
            </View>
          )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

