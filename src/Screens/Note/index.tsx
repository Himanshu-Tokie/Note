import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import DateTime from '../../components/DateTime';
import Header from '../../components/Header';
import { styles } from './styles';

const Note = ({route}) => {
  console.log(route,87);
  
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
        if(route.params.note.newReminder !== undefined)
          isNew.current = true
      }
    }
    // if(reminder.current)setDate(route.params.note.timestamp);
  const RichText = useRef(); 
  const articleData = useRef(data);
  const [title, setTitle] = useState(initialTitle);
  const [value, setValue] = useState(data);
  const [label, setLable] = useState(lable);
  const labelRef = useRef(lable);
  const titleRef = useRef(initialTitle);
  console.log(value, 1);
  console.log(articleData.current, 2);
  console.log(title, 3);
  console.log(labelRef, 4);
  console.log(dateRef.current,5);
  

  const createReminder = async () => {
    try {
      await firestore()
        .collection('user')
        .doc(uid)
        .collection('reminder')
        .add({
          title: titleRef.current,
          content: articleData.current,
          timeStamp: date.current,
        })
        .then(() => {
          console.log('new reminder added successfully');
        });
    } catch (e) {
      console.log(e, 'reminder');
    }
  };
  const updateReminder = async () => {
    try {
      await firestore()
        .collection('user')
        .doc(uid)
        .collection('reminder')
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
      console.log(e, 'reminder');
    }
    console.log(dateRef);
    
  };
  const updateData = async () => {
    try {
      console.log(articleData.current, 'data tobe uppdated');
      console.log(titleRef.current, 'updated title');
      console.log(uid, 123);
      console.log(noteId, 123);

      await firestore()
        .collection('user')
        .doc(uid)
        .collection('notes')
        .doc(noteId)
        .update({
          // label: labelRef.current,
          title: titleRef.current,
          content: articleData.current,
        });
      console.log('success');
    } catch (e) {
      console.log(e);
    }
  };
  const createNote = async () => {
    try {
      await firestore()
        .collection('user')
        .doc(uid)
        .collection('notes')
        .add({
          label: labelRef.current,
          title: titleRef.current,
          content: articleData.current,
        })
        .then(() => {
          console.log('new note added successfully');
        });
      const increment = firestore.FieldValue.increment(1);
      if (noteIdExist.current) {
        console.log('note exist');
        await firestore()
          .collection('user')
          .doc(uid)
          .collection('labels')
          .doc(labelRef.current)
          .update({count: increment})
          .then(() => console.log('success'))
          .catch(e => console.log(e));
      } else {
        console.log('note  not exist');
        await firestore()
          .collection('user')
          .doc(uid)
          .collection('labels')
          .doc(labelRef.current)
          .set({count: 1})
          .then(() => console.log('success label'))
          .catch(e => console.log(e));
      }
    } catch {}
  };
  useEffect(() => {
    dateRef.current = date;
  }, [date]);

  useEffect(()=>{
    const fetchData = async () => {
      if (!isNew.current) {
        if(reminder.current)
          {console.log('reminder updated success');       
          await updateReminder()}
        else
        {console.log('note updated success');  
        await updateData();}
      } else {
        if(reminder.current)
          {console.log('reminder created success');  
          await createReminder();}
        else
        {await createNote();
        console.log('note created success'); } 
      }
    };
    return fetchData; 
  },[])

  const scrollRef = useRef(null);
  const onCursorPosition = scrollY => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header headerText={label} />
      </View>
      {/* <ScrollView style={styles.container} ref={scrollRef}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.subContainer}>
        <TextInput
          onChangeText={text => {
            titleRef.current = text;
            setTitle(text);
          }}
          placeholder="title"
          value={title}
          style={styles.title}></TextInput>
        {/* <TextInput
            onChangeText={text => {
              labelRef.current = text;
              setLable(text);
            }}
            placeholder="label"
          value={label}></TextInput> */}
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          initialContentHTML={value}
          style={styles.rich}
          editorStyle={styles.richeditor}
          placeholder={'Start Writing Here'}
          onChange={text => {
            // setArticle(text);
            articleData.current = text;
          }}
          onCursorPosition={onCursorPosition}
        />
        {reminder.current && <DateTime date={date} setDate={setDate}></DateTime>}
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
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Note;
