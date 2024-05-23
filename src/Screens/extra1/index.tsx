import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import withTheme from '../../components/HOC';
import Search from '../../components/Header';
import ListTemplate from '../../components/listTemplate/listTemplate';
import { STRINGS } from '../../constants/strings';
import { styles } from './style';

function Extar1({theme}) {
  const user = auth().currentUser;
  const THEME = theme;
  let uid = user?.uid;
  const [notesData, setNotesData] = useState([]);
  console.log('Label creater Page');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .get();
        const newData = []; // Temporary array to accumulate data
        data.forEach(doc => {
          newData.push({id: doc.id});
        });

        setNotesData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // Fetch initial data
    // Set up listener for real-time updates
    const unsubscribe = firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(uid)
      .collection(STRINGS.FIREBASE.LABELS)
      .onSnapshot(querySnapshot => {
        const newData = []; // Temporary array to accumulate data
        querySnapshot.forEach(doc => {
          newData.push({id: doc.id});
        });
        setNotesData(newData);
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);
  // console.log(newLabel.current);
  return (
    <>
      <SafeAreaView
        style={[styles.container, {backgroundColor: THEME.BACKGROUND}]}>
        <View style={styles.subContainer}>
          <View>
            <Search
              // onChangeText={search}
              // notesData={notesData}
              headerText={'Edit Labels'}
            />
          </View>
          {/* <EditLables onChangeText={setNewLabel} /> */}

          {/* fetch label and show label list */}
          <View style={styles.labelContainer}>
            <FlatList
              data={notesData}
              style={styles.list}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ListTemplate note={item} label={true} />
              )}></FlatList>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default withTheme(Extar1);
