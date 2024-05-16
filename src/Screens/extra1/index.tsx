import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, SafeAreaView, View } from "react-native";
import DialogInput from 'react-native-dialog-input';
import Search from '../../components/Header';
import ListTemplate from '../../components/listTemplate/listTemplate';
import { STRINGS } from '../../constants/strings';
import { styles } from "./style";

export default function Extar1({ route }) {
    const user = auth().currentUser;
    let uid = user?.uid;
    // const [searchData, setSearchData] = useState([])
    const [notesData, setNotesData] = useState([]);
    console.log('Label creater Page');
    // const [newLabel, setNewLabel] = useState('');
    const newLabel = useRef('');
    const [show, setShow] = useState(false)
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
                    newData.push({ id: doc.id });
                });

                setNotesData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Fetch initial data
        // Set up listener for real-time updates
        const unsubscribe = firestore()
            .collection(STRINGS.FIREBASE.USER)
            .doc(uid)
            .collection(STRINGS.FIREBASE.LABELS)
            .onSnapshot(querySnapshot => {
                const newData = []; // Temporary array to accumulate data  
                querySnapshot.forEach(doc => {
                    newData.push({ id: doc.id });
                });
                setNotesData(newData);
            });

        // Stop listening for updates when no longer required
        return () => unsubscribe();
    }, [])
    // console.log(newLabel.current);
    useEffect(() => {
        const addNewLabel = async () => {
            try {
                if (newLabel.current !== '') {
                    await firestore()
                        .collection(STRINGS.FIREBASE.USER)
                        .doc(uid)
                        .collection(STRINGS.FIREBASE.LABELS)
                        .doc(newLabel.current)
                        .set({
                            count: 0
                        }).then(() => console.log('successfully added label')
                        ).catch(e => console.log(e)
                        );
                }

            } catch (error) {
                console.error('Error adding new label:', error);
            }
        };

        addNewLabel();
    }, [newLabel.current]);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <Search
                        // onChangeText={search}
                        // notesData={notesData}
                        headerText={'Edit Labels'}
                    />
                </View>
                {/* <EditLables onChangeText={setNewLabel} /> */}
                <Button title='Add Label' onPress={() => setShow(true)} />
                <DialogInput isDialogVisible={show}
                    title={STRINGS.ADD_LABEL}
                    hintInput={STRINGS.LABEL_NAME}
                    submitInput={(input) => { newLabel.current = input; setShow(false) }}
                    closeDialog={() => { setShow(false) }}>
                </DialogInput>



                {/* fetch label and show label list */}
                <View style={styles.subContainer}>
                    <FlatList
                        data={notesData}
                        style={styles.list}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ListTemplate note={item} label={true} />
                        )}></FlatList>
                </View>
            </SafeAreaView>
        </>
    )
}