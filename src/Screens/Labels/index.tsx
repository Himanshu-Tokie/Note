import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListTemplate from "../../components/listTemplate/listTemplate";


export default function Label({navigation,route}){
    const uid = route.params.note;
    const label = route.params.text.id;

    const [data,setData] = useState([])
    console.log(uid, label);
    
    const getData=async()=>{
        try {
          const snapShot = await firestore()
            .collection('user')
            .doc(uid)
            .collection('notes')
            .where('label','==',label).get();
            // console.log(snapShot.docs,19);
            const labelData = []
            snapShot.forEach(doc => {     
                labelData.push({ title:doc.data().title,data: doc.data().content,noteId:doc.id, id:uid })
              });
              setData(labelData);
        } catch (error) {
          console.error('Error retrieving notes:', error);
        }
      }
    useEffect(()=>{
        getData();
        
    },[])

    return(
        <>
        <SafeAreaView>
        <View>
        <FlatList
            renderItem={({ item, index }) => {
              return (
                <ListTemplate note={item} nav={navigation}/>
              );
            }}
            data={data}
          ></FlatList>
        </View>
        </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    image:{
        height:50,
        width:50
    }
})