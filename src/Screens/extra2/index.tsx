import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import Search from '../../components/Header';
import ListTemplate from "../../components/listTemplate/listTemplate";
import { styles } from "./style";
export default function Extar2({route}) {
    const notesData = [
        {
            id:1,
            title: 'reminder 1',
            data: 'notification',
            timestamp: 'xyz'
        },
        {
            id:2,
            title: 'reminder 2',
            data: 'notification',
            timestamp: 'xyz'
        }
    ]
    const [searchData, setSearchData] = useState(notesData)
    //   const [notesData, setNotesData] = useState([]);
    const search = () => {

    }
    return (
        <>
            <SafeAreaView>
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
                        // keyExtractor={item => item.noteId}
                        // numColumns={2}
                        renderItem={({ item }) => (
                            <ListTemplate note={item} nav={route.params.parentNavigation} maxHeight={150} />
                        )}></FlatList>
                </View>
                {/* <View style={styles.addNotes}>
                    <CustomButton
                        text="+  Add New Notes"
                        style={[styles.customButton]}
                        onPress={addNewNote}
                    />
                </View> */}
            </SafeAreaView>
        </>
    )
}