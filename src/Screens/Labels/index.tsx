import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../Components/Button/customButton';
import withTheme from '../../Components/HOC';
import Search from '../../Components/Header';
import StaggedLabel from '../../Components/Staggered';
import { SCREEN_CONSTANTS } from '../../Constants';
import { STRINGS } from '../../Constants/Strings';
import { styles } from './style';

function Label({navigation, route, theme}) {
  // console.log(route, 123321123)
  const uid = route.params.note;
  const label = route.params.text;
  const THEME = theme;
  const [searchData, setSearchData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  console.log('label Page');
  const note = {
    uid,
    label,
  };

  const search = e => {
    let text = e.toLowerCase();
    let filteredData = notesData.filter(item => {
      return (
        item.data.toLowerCase().match(text) ||
        item.title.toLowerCase().match(text)
      );
    });
    // console.log(filteredData);
    setSearchData(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.NOTES)
          .where('label', '==', label)
          .get();

        const newData = []; // Temporary array to accumulate data

        data.forEach(doc => {
          newData.push({
            title: doc.data().title,
            data: doc.data().content,
            noteId: doc.id,
            id: uid,
            label: label,
          });
        });

        setNotesData(newData);
        setSearchData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch initial data

    // Set up listener for real-time updates
    const unsubscribe = firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(uid)
      .collection(STRINGS.FIREBASE.NOTES)
      .where('label', '==', label)
      .onSnapshot(querySnapshot => {
        const newData = []; // Temporary array to accumulate data
        querySnapshot.forEach(doc => {
          newData.push({
            title: doc.data().title,
            data: doc.data().content,
            noteId: doc.id,
            id: uid,
            label: label,
          });
        });

        setNotesData(newData);
        setSearchData(newData);
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, [uid]);

  const addNewNote = () => {
    navigation.navigate(SCREEN_CONSTANTS.Note, {note});
  };
  return (
    <>
      <SafeAreaView
        style={[styles.container, {backgroundColor: THEME.BACKGROUND}]}>
        <View>
          <Search
            onChangeText={search}
            setSearchData={setSearchData}
            notesData={notesData}
            headerText={label}
          />
        </View>
        <StaggedLabel data={searchData} />
        <View style={styles.addNotes}>
          <CustomButton
            text="+  Add New Notes"
            style={[styles.customButton]}
            onPress={addNewNote}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default withTheme(Label);
