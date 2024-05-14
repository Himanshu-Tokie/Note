import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/Button/customButton';
import Search from '../../components/Header';
import ListTemplate from '../../components/listTemplate/listTemplate';
import { screenConstant } from '../../constants';
import { styles } from './style';
import { useFocusEffect } from '@react-navigation/native';

export default function Label({ navigation, route }) {
  console.log(route, 123321123)
  const uid = route.params.note;
  const label = route.params.text;
  const [searchData, setSearchData] = useState([])
  const [notesData, setNotesData] = useState([]);
  console.log('label Page');
  const note = {
    uid,
    label,
  };

  const search = (e) => {
    let text = e.toLowerCase();
    let filteredData = notesData.filter((item) => {
      return item.data.toLowerCase().match(text) || item.title.toLowerCase().match(text)
    })
    console.log(filteredData);
    setSearchData(filteredData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firestore()
          .collection('user')
          .doc(uid)
          .collection('notes')
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
      .collection('user')
      .doc(uid)
      .collection('notes')
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
    navigation.navigate(screenConstant.Note, { note });
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Search
            onChangeText={search}
            setSearchData={setSearchData}
            notesData={notesData}
            headerText={label}
          />
        </View>
        <View style={styles.subContainer}>
          <FlatList
            data={searchData}
            style={styles.list}
            keyExtractor={item => item.noteId}
            numColumns={2}
            renderItem={({ item }) => (
              <ListTemplate note={item} nav={navigation} maxHeight={150} />
            )}></FlatList>
        </View>
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

