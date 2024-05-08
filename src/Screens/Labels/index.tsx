import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/Button/customButton';
import Search from '../../components/Header';
import ListTemplate from '../../components/listTemplate/listTemplate';
import { screenConstant } from '../../constants';
import { styles } from './style';

export default function Label({navigation, route}) {
  console.log(route,123321123)
  const uid = route.params.note;
  const label = route.params.text;
  const [searchData,setSearchData] = useState([])
  const [notesData, setNotesData] = useState([]);
  // const searchData = route.params.searchData;
  // const setNotesData = route.params.setNotesData;
  // const setSearchData = route.params.setSearchData;
  console.log('label Page');
  const note = {
    uid,
    label,
  };
  const getData = async () => {
    const data = await firestore()
      .collection('user')
      .doc(uid)
      .collection('notes')
      .where('label', '==', label)
      .get();
    // console.log(data.doc(),'testttt');

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
  };

  const search=(e)=>{
    let text = e.toLowerCase();
    let filteredData = notesData.filter((item)=>{
      return item.data.toLowerCase().match(text) || item.title.toLowerCase().match(text)
    })
    console.log(filteredData); 
    setSearchData(filteredData);
  }

  useEffect(() => {
    getData();
  }, []);
  const addNewNote = () => {
    navigation.navigate(screenConstant.Note, {note});
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
            renderItem={({item}) => (
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

// import firestore from '@react-native-firebase/firestore';
// import { useRoute } from '@react-navigation/native';
// import { useEffect, useState } from 'react';
// import { FlatList, View } from 'react-native';
// import ListTemplate from '../../components/listTemplate/listTemplate';
// import { styles } from './style';

// const Labels = () => {
//   const route = useRoute();
//   const uid = route.params.note;
//   const label = route.params.text;
//   const [notesData, setNotesData] = useState([]);

//   const getData = async () => {
//     const data = await firestore()
//       .collection('user')
//       .doc(uid)
//       .collection('notes')
//       .where('label', '==', label)
//       .get();
//     console.log(data, 'testttt');

//     const newData = []; // Temporary array to accumulate data

//     data.forEach(doc => {
//       newData.push({
//         title: doc.data().title,
//         data: doc.data().content,
//         noteId: doc.id,
//         id: uid,
//         label: label,
//       });
//     });

//     setNotesData(newData);
//   };
//   console.log(notesData, 'notessss');

//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <FlatList
//       data={notesData}
//       renderItem={({
//         item,
//         index
//       })=>(
//         // <View>
//            <ListTemplate note={item}  />
//         // {/* </View> */}
//       )}
//       />
//     </View>
//   )
//   // return (
//   //   <>
//   //     <View style={styles.container}>
//   //       <View style={styles.subContainer}>
//   //         {!!notesData.length && (
//   //           <FlatList
//   //             data={notesData}
//   //             // keyExtractor={(item,index)=>index.toString()}
//   //             // numColumns={1}
//   //             renderItem={({item, index}) => (
//   //               //  <ListTemplate note={item}  />
//   //               <View></View>
//   //             )}
//   //           />
//   //         )}
//   //       </View>
//   //     </View>
//   //   </>
//   // );
// };

// export default Labels;
