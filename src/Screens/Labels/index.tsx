import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListTemplate from '../../components/listTemplate/listTemplate';
import { styles } from './style';

export default function Label({navigation, route}) {
  const uid = route.params.note;
  const label = route.params.text;
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const snapShot = await firestore()
      .collection('user')
      .doc(uid)
      .collection('notes')
      .where('label', '==', label)
      .get();
    
    const newData = []; // Temporary array to accumulate data

    snapShot.forEach(doc => {
      newData.push({
        title: doc.data().title,
        data: doc.data().content,
        noteId: doc.id,
        id: uid,
        label: label
      });
    });
    console.log(newData);
    
    setData(prevData => [...prevData, ...newData]);
    console.log(data,10)
    // return snapShot;
    
  } catch (error) {
    console.error('Error retrieving notes:', error);
  }
};

useEffect(() => {
  getData()    
    console.log('label fetched data', 10);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <FlatList
          keyExtractor={(item)=>item.noteId}
            numColumns={2}
            renderItem={({item, index}) => {
              return <ListTemplate note={item} nav={navigation} />;
            }}
            data={data}></FlatList>
          {/* <FlatList
              numColumns={2}
              renderItem={({item})=><Text style={styles.subContainer}>{item.name}</Text>}
              data={persons}
            > */}

          {/* </FlatList> */}
        </View>
      </SafeAreaView>
    </>
  );
}
