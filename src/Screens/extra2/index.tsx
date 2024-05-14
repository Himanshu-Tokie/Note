import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import Search from '../../components/Header';
import ListTemplate from "../../components/listTemplate/listTemplate";
import { styles } from "./style";

export default function Extar2({ route }) {
    const user = auth().currentUser;
  let uid = user?.uid;
    const [searchData, setSearchData] = useState([])
    const [notesData, setNotesData] = useState([]);
    console.log('reminder Page');

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
                    .collection('reminder')
                    .get();

                const newData = []; // Temporary array to accumulate data

                data.forEach(doc => {
                    newData.push({
                        title: doc.data().title,
                        data: doc.data().content,
                        noteId: doc.id,
                        id: uid,
                        timestamp:doc.data().timeStamp
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
            .collection('reminder')
            .onSnapshot(querySnapshot => {
                const newData = []; // Temporary array to accumulate data  
                querySnapshot.forEach(doc => {
                    newData.push({
                        title: doc.data().title,
                        data: doc.data().content,
                        noteId: doc.id,
                        id: uid,
                        timestamp:doc.data().timeStamp
                    });
                });
                setNotesData(newData);
                setSearchData(newData);
            });

        // Stop listening for updates when no longer required
        return () => unsubscribe();
    }, [uid]);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <Search
                        onChangeText={search}
                        setSearchData={setSearchData}
                        notesData={notesData}
                        headerText={'Reminder'}
                    />
                </View>
                <View style={styles.subContainer}>
                    <FlatList
                        data={searchData}
                        style={styles.list}
                        keyExtractor={item => item.noteId}
                        // numColumns={2}
                        renderItem={({ item }) => (
                            <ListTemplate note={item} nav={route.params.parentNavigation} maxHeight={150} />
                        )}></FlatList>
                </View>
            </SafeAreaView>
        </>
    )
}