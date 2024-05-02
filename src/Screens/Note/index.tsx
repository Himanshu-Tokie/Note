import { FieldValue } from '@firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

const Note = ({navigation, route}) => {
  const RichText = useRef();
  // const [article, setArticle] = useState('');
  const articleData = useRef();
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(data);
  const [label,setLable] = useState('')
  const isNew = useRef(true)
  let uid=''
  let initialTitle=''
  let noteId=''
  let data=''
  // let lable=''
  if(route.params.id){
  data = route.params.note.data;
  uid = route.params.note.id;
  initialTitle = route.params.note.title;
  noteId = route.params.note.noteId;
  isNew.current=false;
}
else {
  uid = route.params.uid
}

  const updateData = async () => {
    try {
      console.log(articleData.current);
      await firestore()
        .collection('user')
        .doc(uid)
        .collection('notes')
        .doc(noteId)
        .update({
          content: articleData.current,
        });
      console.log('success');
    } catch {
      console.log('fail');
    }
  };
  const createNote=async()=>{
    try{
      await firestore()
      .collection('user')
      .doc(uid)
      .collection('notes')
      .add({
        label: (label?label:'other'),
        title: initialTitle,
        content: articleData.current,
      })
      await firestore()
      .collection('user')
      .doc(uid)
      .collection('labels')
      .doc((label?label:'other'))
      .set({count:FieldValue.increment(1)})
    }
    catch{

    }
  }
  useEffect(() => {
    if(!isNew.current)
    return updateData;
    else
    return createNote;
  }, []);

  const scrollRef = useRef(null);
  const onCursorPosition = scrollY => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.container} ref={scrollRef}>
        <Text style={styles.text}>Editor</Text>
        <TextInput
          onChangeText={setTitle}
          placeholder="title"
          value={initialTitle}></TextInput>
          <TextInput
          onChangeText={setLable}
          placeholder="label"
          value={label}></TextInput>
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          initialContentHTML={value}
          style={styles.rich}
          placeholder={'Start Writing Here'}
          onChange={text => {
            // setArticle(text);
            articleData.current = text;
          }}
          onCursorPosition={onCursorPosition}
        />
        <RichToolbar
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
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Note;

const styles = StyleSheet.create({
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    // marginTop: 40,
    backgroundColor: '#F5FCFF',
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});
