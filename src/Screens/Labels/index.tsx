import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/Button/customButton';
import ListTemplate from '../../components/listTemplate/listTemplate';
import { styles } from './style';

export default function Label({navigation, route}) {
  const uid = route.params.note;
  const label = route.params.text;
  const [notesData, setNotesData] = useState([]);
  console.log("TESTTTTT");

  const getData = async() => {
      const data=await firestore()
      .collection('user')
      .doc(uid)
      .collection('notes')
      .where('label', '==', label)
      .get()
        console.log(data,'testttt');

        const newData = []; // Temporary array to accumulate data

        data.forEach(doc => {
          newData.push({
            title: doc.data().title,
            data: doc.data().content,
            noteId: doc.id,
            id: uid,
            label: label
          });
        });

        setNotesData(newData);

};

useEffect(() => {
  getData()
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <FlatList
          data={notesData}
          style={styles.list}
          keyExtractor={item=>item.noteId}
            numColumns={2}
            renderItem={({item}) => (
         <ListTemplate note={item} nav={navigation} maxHeight={150}/>)
            }
            >
            </FlatList>
        </View>
        <View>
          <CustomButton  text='+  Add New Notes'/>
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
