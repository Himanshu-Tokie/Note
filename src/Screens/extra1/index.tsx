import { default as auth } from '@react-native-firebase/auth';
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import EditLables from '../../components/EditLables';
import Search from '../../components/Header';
import { styles } from "./style";

export default function Extar1({ route }) {
    const user = auth().currentUser;
  let uid = user?.uid;
    const [searchData, setSearchData] = useState([])
    const [notesData, setNotesData] = useState([]);
    console.log('Label creater Page');

    // const search = (e) => {
    //     let text = e.toLowerCase();
    //     let filteredData = notesData.filter((item) => {
    //         return item.data.toLowerCase().match(text) || item.title.toLowerCase().match(text)
    //     })
    //     console.log(filteredData);
    //     setSearchData(filteredData);
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await firestore()
    //                 .collection('user')
    //                 .doc(uid)
    //                 .collection('reminder')
    //                 .get();

    //             const newData = []; // Temporary array to accumulate data

    //             data.forEach(doc => {
    //                 newData.push({
    //                     title: doc.data().title,
    //                     data: doc.data().content,
    //                     noteId: doc.id,
    //                     id: uid,
    //                     timestamp:doc.data().timeStamp
    //                 });
    //             });

    //             setNotesData(newData);
    //             setSearchData(newData);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData(); // Fetch initial data

    //     // Set up listener for real-time updates
    //     const unsubscribe = firestore()
    //         .collection('user')
    //         .doc(uid)
    //         .collection('reminder')
    //         .onSnapshot(querySnapshot => {
    //             const newData = []; // Temporary array to accumulate data  
    //             querySnapshot.forEach(doc => {
    //                 newData.push({
    //                     title: doc.data().title,
    //                     data: doc.data().content,
    //                     noteId: doc.id,
    //                     id: uid,
    //                     timestamp:doc.data().timeStamp
    //                 });
    //             });
    //             setNotesData(newData);
    //             setSearchData(newData);
    //         });

    //     // Stop listening for updates when no longer required
    //     return () => unsubscribe();
    // }, [uid]);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <Search
                        // onChangeText={search}
                        notesData={notesData}
                        headerText={'Edit Labels'}
                    />
                </View>
                <EditLables/>




                {/* fetch label and show label list */}
                {/* <View style={styles.subContainer}>
                    <FlatList
                        data={searchData}
                        style={styles.list}
                        keyExtractor={item => item.noteId}
                        // numColumns={2}
                        renderItem={({ item }) => (
                            <ListTemplate note={item} nav={route.params.parentNavigation} maxHeight={150} />
                        )}></FlatList>
                </View> */}
            </SafeAreaView>
        </>
    )
}