import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useHeaderHeight } from "@react-navigation/elements";
import * as htmlparser2 from "htmlparser2";
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import DateTime from '../../components/DateTime';
import Header from '../../components/Header';
import { STRINGS } from '../../constants/strings';
import { styles } from './styles';

const Note = ({route}) => {
  // console.log(route, 87);

  const user = auth().currentUser;
  let uid = user?.uid;
  let initialTitle = '';
  let noteId = '';
  let data = '';
  let lable = 'Others';
  const reminder = useRef(false);
  const isNew = useRef(true);
  const noteIdExist = useRef(false);
  const [date, setDate] = useState(new Date());
  const dateRef = useRef(date);
  if (route.params != undefined)
    if (route.params?.note != undefined) {
      if (route.params.note.noteId == undefined) {
        lable = route.params.note.label;
      } else {
        data = route.params.note.data;
        initialTitle = route.params.note.title;
        noteId = route.params.note.noteId;
        lable = route.params.note.label;
        isNew.current = false;
        noteIdExist.current = true;
      }
      if (route.params.note.timestamp !== undefined) {
        // dateRef.current = route.params.note.timestamp
        reminder.current = true;
        if (route.params.note.newReminder !== undefined) isNew.current = true;
      }
    }
  // if(reminder.current)setDate(route.params.note.timestamp);
  const RichText = useRef();
  const articleData = useRef(data);
  const [title, setTitle] = useState(initialTitle);
  // const [value, setValue] = useState(data);
  const [label, setLable] = useState(lable);
  const labelRef = useRef(lable);
  const titleRef = useRef(initialTitle);
  // console.log(value, 1);
  // console.log(articleData.current, 22);
  // console.log(titleRef, 33);
  // console.log(labelRef, 44);
  // console.log(dateRef.current, 55);
  

  const createReminder = async () => {
    try {
      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.REMINDER)
        .add({
          title: titleRef.current,
          content: articleData.current,
          timeStamp: dateRef.current,
        })
        .then(() => {
          console.log('new reminder added successfully');
        });
    } catch (e) {
      console.log(e, STRINGS.FIREBASE.REMINDER);
    }
  };
  const updateReminder = async () => {
    try {
      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.REMINDER)
        .doc(noteId)
        .update({
          title: titleRef.current,
          content: articleData.current,
          timeStamp: dateRef.current,
        })
        .then(() => {
          console.log('reminder updated successfully');
        });
    } catch (e) {
      console.log(e, 'reminderrrr');
    }
    // console.log(dateRef);
  };
  const updateData = async () => {
    try {
      console.log(articleData.current, 'data tobe uppdated');
      console.log(titleRef.current, 'updated title');
      console.log(uid, 123);
      console.log(noteId, 123);

      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .update({
          title: titleRef.current,
          content: articleData.current,
        });
      console.log('success updated');
      // const increment = firestore.FieldValue.increment(1);
      //   console.log('note exist');
      //   await firestore()
      //     .collection(STRINGS.FIREBASE.USER)
      //     .doc(uid)
      //     .collection(STRINGS.FIREBASE.LABELS)
      //     .doc(labelRef.current)
      //     .update({count: increment})
      //     .then(() => console.log('success'))
      //     .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  const createN = async()=>{
    await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .add({
          label: labelRef.current,
          title: titleRef.current,
          content: articleData.current,
        })
        .then(() => {
          console.log('new note added successfully');
        });
        // console.log('asdfafasdfasg');
  }
  // function stripHtml(html) {
  //   // Create a new DOM parser
  //   const parser = new DOMParser();
  //   // Parse the HTML string into a document
  //   const doc = parser.parseFromString(html, 'text/html');
  //   // Extract and return the text content of the document
  //   return doc.body.textContent || "";
  // }
  const createNote = async () => {
    try {
      const regex = /^[\s\r\n]*$/;
      const dom = htmlparser2.parseDocument(articleData.current);
      console.log(dom,44444444);
      
      // stripHtml(articleData.current)
      console.log(!regex.test(articleData.current),34534534578678);
      console.log(!regex.test(titleRef.current),'title');
      console.log(articleData);
      if( (!regex.test(articleData.current)) || !regex.test(titleRef.current) )
      {
        createN();
        console.log('asdfafasdfasg');
        const count = await firestore().collection(STRINGS.FIREBASE.USER).doc(uid).collection(STRINGS.FIREBASE.LABELS).doc(labelRef.current).get();
        console.log(count,123423435);
        
        let updatedcount = count.data();
        updatedcount=updatedcount['count']+1
        await firestore().collection(STRINGS.FIREBASE.USER).doc(uid).collection(STRINGS.FIREBASE.LABELS).doc(labelRef.current).set({count:updatedcount},{ merge: true },).
        then(()=>console.log('hurray')).catch(()=>console.log('hurray error00'))
        console.log(updatedcount,98765);

        
        // const collectionRef = firestore().collection('users').doc(uid);
        // const doc = await collectionRef.get();
        // console.log("will i get the doc")
        // if (doc.exists) {
        //   const userData = doc.data();
        //   // console.log(userData, "USERDATA")
        //   const updatedCollections = userData.collections.map(collection => {
        //     // console.log(collection, "COLLECTTT")
        //     if (collection.text === label) {
        //       return {
        //         ...collection,
        //         number: collection.number + 1,
        //       };
        //     }
        //     return collection;
        //   });
        //   await collectionRef.set(
        //     { collections: updatedCollections },
        //     { merge: true },
        //   );
      // if (!noteIdExist.current) {
      //   const increment = firestore.FieldValue.increment(1);
      //   console.log('note exist');
      //   await firestore()
      //     .collection(STRINGS.FIREBASE.USER)
      //     .doc(uid)
      //     .collection(STRINGS.FIREBASE.LABELS)
      //     .doc(labelRef.current)
      //     .update({count: increment})
      //     .then(() => console.log('success'))
      //     .catch(e => console.log(e));
      // } else {
      //   console.log('note  not exist');
      //   await firestore()
      //     .collection(STRINGS.FIREBASE.USER)
      //     .doc(uid)
      //     .collection(STRINGS.FIREBASE.LABELS)
      //     .doc(labelRef.current)
      //     .set({count: 1})
      //     .then(() => console.log('success label'))
      //     .catch(e => console.log(e));
      // }}
    }} catch (e){console.log(e);
    }
  };
  useEffect(() => {
    dateRef.current = date;
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isNew.current) {
        if (reminder.current) {
          await updateReminder();
          console.log('reminder updated success');
        } else {
          await updateData();
          console.log('note updated success');
        }
      } else {
        if (reminder.current) {
          await createReminder();
          console.log('reminder created success');
        } else {
          await createNote();
          console.log('note created success');
        }
      }
    };
    return fetchData;
  }, []);

  const scrollRef = useRef(null);
  const onCursorPosition = scrollY => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    }
  };
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardOffset(event.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : heightPercentageToDP('5.9%')}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboardOffset}
        style={styles.subContainer}>
      <View>
        <Header headerText={label} />
      </View>
      {/* <ScrollView style={styles.container} ref={scrollRef}> */}
        <TextInput
          onChangeText={text => {
            titleRef.current = text;
            setTitle(text);
          }}
          placeholder="title"
          value={title}
          style={styles.title}></TextInput>
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          initialContentHTML={articleData.current}
          style={styles.rich}
          editorStyle={styles.richeditor}
          placeholder={'Start Writing Here'}
          onChange={text => {
            // setArticle(text);
            articleData.current = text;
          }}
          scrollEnabled={true}
          onCursorPosition={onCursorPosition}
        />
        {reminder.current && (
          <DateTime date={date} setDate={setDate}></DateTime>
        )}
        <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={'purple'}
          selectedIconTint={'pink'}
          disabledIconTint={'purple'}
          // onPressAddImage={onPressAddImage}
          iconSize={25}
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.heading1,
          ]}
        />
      {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Note;


