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
  const data = route.params.note.data;
  const RichText = useRef();
  const [article, setArticle] = useState('');
  const articleData = useRef();
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(data);
  const uid = route.params.note.uid;
  const initialTitle = route.params.note.title;
  const noteId = route.params.note.noteId;

  // this function will be called when the editor has been initialized
  //   function editorInitializedCallback() {
  //     RichText.current?.registerToolbar(function (items) {
  //       // items contain all the actions that are currently active
  //       console.log(
  //         "Toolbar click, selected items (insert end callback):",
  //         items
  //       );
  //     });
  //   }
  console.log(route);
  // console.log(uid);
  // console.log(initialTitle);
  // console.log(data);
  console.log(article);
  //   const getData=async()=>{
  //     try {
  //       const snapShot = await firestore()
  //         .collection('user')
  //         .doc(uid)
  //         .collection('notes')
  //         .get();

  //       snapShot.forEach(doc => {
  //         // Process each note document
  //         console.log(doc.data(), 90);
  //         console.log(doc.id);

  //       });
  //     } catch (error) {
  //       console.error('Error retrieving notes:', error);
  //     }
  //   }
  const updateData = async () => {
    try {
      // const newData = article
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
  useEffect(() => {
    return updateData;
  }, []);
  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  //   function onPressAddImage() {
  //     // you can easily add images from your gallery
  //     RichText.current?.insertImage(
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
  //     );
  //   }
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
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          initialContentHTML={value}
          style={styles.rich}
          placeholder={'Start Writing Here'}
          onChange={text => {
            setArticle(text);
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
