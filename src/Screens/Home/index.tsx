import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import { useSelector } from 'react-redux';
import LabelTemplate from '../../components/labelTemplate/labelTemplate';
import { screenConstant } from '../../constants';
import { ICONS } from '../../constants/Icons';
import { images } from '../../constants/Images';
import { COLORS, DARK_COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { styles } from './style';

export default function Home({navigation}) {
  // const userRedux = useSelector(state=>state.common.user)
  const user = auth().currentUser;
  const colorScheme = useSelector((state) => state.theme.theme);
  // const colorScheme = 'dark'
  // console.log(user?.photoURL,1919191);
  
  const defaultImage = 'https://github.com/Himanshu-Tokie/Note/blob/744e180b4a9128b4ecfb2d959f815fbba8871aa1/src/assets/Images/defaultUser.png';
  const photoURL = user?.photoURL ? { uri: user.photoURL } : { uri: defaultImage };
  const addNote = () => {
    navigation.navigate(screenConstant.Note, {uid: user.uid});
  };
  const isLogedIn = useSelector(state => state.common[STRINGS.IS_LOGGED_IN]);

  const [label, setLabel] = useState('');
  // console.log(label);
  // console.log(isLogedIn, 1234134124);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', e => {
  //     if (JSON.parse(isLogedIn)) {
  //       console.log(isLogedIn, 1234134124);
  //       e.preventDefault();
  //     }
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  useEffect(() => {
    getLabel();
    if(user)
    {const unsubscribe = firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(user.uid)
      .collection(STRINGS.FIREBASE.LABELS)
      .onSnapshot(querySnapshot => {
        const newData = []; // Temporary array to accumulate data
        querySnapshot.forEach(doc => {
          newData.push({id: doc.id, count: doc.data().count});
        });
        setLabel(newData);
      });

    // Stop listening for updates when no longer required
    return () => {
      console.log('home unsubcribe');
     unsubscribe();
    }}
  }, []);
  const getAllData = async()=>{
    try{
      await firestore().collection(STRINGS.FIREBASE.USER).doc(user.uid).get().then(()=>{console.log('all data fetched successfully');
      });
    }
    catch (e){
      console.log(e,91);
      
    }
  }
  const getLabel = async () => {
    try {
      if(user)
      {
        getAllData();
        
        const snapShot = await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.LABELS)
        .get();
      const labelData = [];
      snapShot.forEach(doc => {
        labelData.push({id: doc.id, count: doc.data().count});
      });
      setLabel(labelData);
      // console.log(label, 70);}
    }
    
  } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };
if(user){
  return (
    <>
      <SafeAreaView style={[styles.container,{backgroundColor: colorScheme==='light'? COLORS.BACKGROUND : DARK_COLORS.BACKGROUND,}]}>
        <View style={styles.subcontainer}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.welcome,{color: colorScheme==='light'? COLORS.TEXT3:DARK_COLORS.TEXT3}]}>
                {'Welcome' + ', ' + user?.displayName + '!'}
              </Text>
              <Text style={[styles.NoteTaking,{color:colorScheme==='light'? COLORS.TEXT1:DARK_COLORS.TEXT1}]}>{STRINGS.NOTE}</Text>
            </View>
            <View style={styles.innerHeader}>
              {/* <View style={styles.icon}>{ICONS.BELL(heightPercentageToDP('2.5%'), heightPercentageToDP('2.5%'), 'white')}</View> */}
              <Image
              source={photoURL}
              style={{
                borderRadius: 10,
                height: heightPercentageToDP('6.6%'),
                width: heightPercentageToDP('6.6%'),
              }}
            />
            </View>
          </View>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <View style={styles.imageContainer}>
              <ImageBackground
                source={colorScheme==='light'? images.HOME: images.HOME_DARK}
                // resizeMode="cover"
                style={styles.image}>
                <View style={styles.imageInner}>
                  {colorScheme==='light'?
                  ICONS.PIECHART(
                    heightPercentageToDP('8.2%'),
                    heightPercentageToDP('8.2%'),
                    'none',
                  ):
                  
                  ICONS.PIECHART_BLACK(
                    heightPercentageToDP('8.2%'),
                    heightPercentageToDP('8.2%'),
                    'none',
                  )}
                  <View style={{paddingLeft: widthPercentageToDP('7%')}}>
                    <Text style={[styles.text]}>{STRINGS.AVAILABLE_SPACE}</Text>
                    <Text style={[styles.size,{color: colorScheme==='light'? COLORS.HOMESIZE:DARK_COLORS.HOMESIZE}]}>{STRINGS.STORAGE}</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            {
              !label &&
              (
                <ActivityIndicator size='large'/>
              )
            } 
            {label && (
              <View style={styles.labels}>
                <FlatList
                  data={label}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  // numColumns={2}
                  renderItem={({item}) => (
                    <LabelTemplate
                      icon={colorScheme==='light'? ICONS.OTHERS: ICONS.INTEL_BLACK}
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
  );}
  else
  {
    return(
      <>
      </>
    )
  }
}
