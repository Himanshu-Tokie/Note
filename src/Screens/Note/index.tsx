import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import { styles } from './styles';

const Note = ({navigation, route}) => {
  const user = auth().currentUser;
  let uid = user?.uid;
  let initialTitle = '';
  let noteId = '';
  let data = '';
  let lable = 'Others';
  const isNew = useRef(true);
  console.log(route.params, 1212);
  console.log(user);
  if (route.params != undefined)
    if (route.params?.note != undefined) {
      data = route.params.note.data;
      uid = route.params.note.id;
      initialTitle = route.params.note.title;
      noteId = route.params.note.noteId;
      lable = route.params.note.label;
      isNew.current = false;
    }
  const RichText = useRef();
  // const [article, setArticle] = useState('');
  const articleData = useRef();
  const [title, setTitle] = useState(initialTitle);
  const [value, setValue] = useState(data);
  const [label, setLable] = useState(lable);
  const labelRef = useRef('Others');
  const titleRef = useRef('');
  console.log(value, 1);
  console.log(articleData, 2);

  // console.log(uid, 2);
  console.log(title, 3);
  console.log(labelRef, 4);

  const updateData = async () => {
    try {
      console.log(articleData.current, 'data tobe uppdated');
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
    } catch {
      console.log('fail');
    }
  };
  const createNote = async () => {
    try {
      await firestore().collection('user').doc(uid).collection('notes').add({
        label: labelRef.current,
        title: titleRef.current,
        content: articleData.current,
      });
      const increment = firestore.FieldValue.increment(1);
      if (labelRef.current == 'Others')
        await firestore()
          .collection('user')
          .doc(uid)
          .collection('labels')
          .doc('Others')
          .update({count: increment})
          .then(() => console.log('success'))
          .catch(e => console.log(e));
      else {
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
    if (!isNew.current) return updateData;
    else return createNote;
  }, []);

  const scrollRef = useRef(null);
  const onCursorPosition = scrollY => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <KeyboardAvoidingView style={styles.subContainer}>
        <TextInput
          onChangeText={text => {
            titleRef.current = text;
            setTitle(text);
          }}
          placeholder="title"
          value={title}
          style={styles.title}></TextInput>
        {/* <TextInput
          onChangeText={(text)=>{
            labelRef.current =text
            setLable(text)
          }}
          placeholder="label"
          value={label}>
        </TextInput> */}
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
        {/* <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={'purple'}
          selectedIconTint={'pink'}
          disabledIconTint={'purple'}
          // onPressAddImage={onPressAddImage}
          iconSize={40}
          // onCursorPosition={onCursorPosition}
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
        /> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Note;
