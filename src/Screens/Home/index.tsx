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
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import LabelTemplate from '../../components/labelTemplate/labelTemplate';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { images } from '../../constants/Images';
import { styles } from './style';

export default function Home({navigation}) {
  // const userRedux = useSelector(state=>state.common.user)
  const user = auth().currentUser;
  const image = 'https://legacy.reactjs.org/logo-og.png'; 
  const photoURL = user?user.photoURL: image;
  const addNote = () => {
    navigation.navigate(screenConstant.Note, {uid: user.uid});
  };
  const [label, setLabel] = useState('');
  console.log(label);
  
  useEffect(() => {
    getLabel();
    const unsubscribe = firestore()
            .collection('user')
            .doc(user.uid)
            .collection('labels')
            .onSnapshot(querySnapshot => {
                const newData = []; // Temporary array to accumulate data  
                querySnapshot.forEach(doc => {
                  newData.push({id: doc.id, count: doc.data().count});
                });
                setLabel(newData);
            });

        // Stop listening for updates when no longer required
        return () => unsubscribe();
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
              {/* <View style={styles.icon}>{ICONS.BELL(heightPercentageToDP('2.5%'), heightPercentageToDP('2.5%'), 'white')}</View> */}
              <Image
                source={{
                  uri: photoURL,
                  height: heightPercentageToDP('6%'),
                  width: heightPercentageToDP('6%'),
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
                {ICONS.PIECHART(heightPercentageToDP('8.2%'), heightPercentageToDP('8.2%'), 'none')}
                <View style={{paddingLeft:widthPercentageToDP('7%')}}>
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
                  note={user.uid}
                  />
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

