import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useHeaderHeight } from '@react-navigation/elements';
import * as htmlparser2 from 'htmlparser2';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import DateTime from '../../components/DateTime';
import DropdownComponent from '../../components/Dropdown/dropdown';
import withTheme from '../../components/HOC';
import Header from '../../components/Header';
import UserImage from '../../components/Image';
import { STRINGS } from '../../constants/strings';
import { loadImage } from '../../store/Image';
import { imageCompressor } from '../../utils';
import { styles } from './styles';

const Note = ({route, theme}) => {
  // console.log(route, 87);
  const dispatch = useDispatch();
  const imageInitData = useSelector(state => state.image.imageUri);
  console.log(imageInitData,908);
  
  const user = auth().currentUser;
  let uid = user?.uid;
  let initialTitle = '';
  let noteId = '';
  let data = '';
  let lable = 'Others';
  let imageInitialData = [];
  const reminder = useRef(false);
  const isNew = useRef(true);
  const isCompleteNew = useRef(false);
  const noteIdExist = useRef(false);
  const [date, setDate] = useState(new Date());
  const dateRef = useRef(date);
  if (route.params != undefined) {
    if (route.params?.labelData != undefined) {
      // console.log(route.params?.labelData, 90);
      isCompleteNew.current = true;
    } else if (route.params?.note != undefined) {
      if (route.params.note.noteId == undefined) {
        lable = route.params.note.label;
      } else {
        data = route.params.note.data;
        initialTitle = route.params.note.title;
        noteId = route.params.note.noteId;
        lable = route.params.note.label;
        isNew.current = false;
        noteIdExist.current = true;
        if (imageInitData[noteId]) imageInitialData = imageInitData[noteId];
      }
      if (route.params.note.timestamp !== undefined) {
        // dateRef.current = route.params.note.timestamp
        reminder.current = true;
        if (route.params.note.newReminder !== undefined) isNew.current = true;
      }
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
  const [value, setValue] = useState(null);
  // console.log(imageInitData[noteId], 88);
  useEffect(() => {
    labelRef.current = value;
  }, [value]);
  // console.log(value, 1);
  // console.log(articleData.current, 22);
  // console.log(titleRef, 33);
  // console.log(labelRef, 44);
  // console.log(dateRef.current, 55);
  const [photo, setPhoto] = useState(null);
  const [imageData, setImageData] = useState(imageInitialData);
  const img = useRef([]);
  console.log(imageData, 34);
  const noteNewId = useRef(null)
  useEffect(() => {
    if (!photo || !uid) {
      console.log('no photo or uid; Note-Image-uploader');
      return;
    }

    const photoName = photo?.split('/').pop(); // Simplified method to get the photo name
    console.log(photoName, 90);

    // const reference = storage().ref(`${uid}/${photoName}`);

    // const uploadPhoto = async () => {
    //   try {
    //     const uploadTask = reference.putFile(photo);

    //     uploadTask.on('state_changed',
    //       taskSnapshot => {
    //         console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    //       },
    //       error => {
    //         console.log(error, 'image error');
    //         Alert.alert('Photo upload failed', error.message);
    //       },
    //       () => {
    //         console.log('Image uploaded to the bucket!');
    //         Alert.alert('Photo uploaded successfully');
    //       }
    //     );
    //   } catch (e) {
    //     console.log(e, 'image error');
    //     Alert.alert('Photo upload failed', e.message);
    //   }
    // };

    console.log(photo, 78);
    const processImage = async () => {
      try {
        const newUri = await imageCompressor(photo);
        setImageData(prevImageData => [...prevImageData, newUri]);
        img.current = [...img.current, newUri];
      } catch (error) {
        console.log('Error compressing image:', error);
      }
    };
    processImage();
  }, [photo, uid]);
  console.log(img.current, 2002);

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
    } catch (e) {
      console.log(e);
    }
  };
  const createN = async () => {
    await firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(uid)
      .collection(STRINGS.FIREBASE.NOTES)
      .add({
        label: labelRef.current,
        title: titleRef.current,
        content: articleData.current,
      })
      .then((data) => {
        console.log(data._documentPath._parts[3]);
        noteNewId.current = data._documentPath._parts[3]
        console.log('new note added successfully');
      });
    // console.log('asdfafasdfasg');
  };
  const createNote = async () => {
    try {
      if (labelRef.current === null) {
        labelRef.current = label;
      }
      const regex = /^[\s\r\n]*$/;
      const dom = htmlparser2.parseDocument(articleData.current);
      // console.log(dom, 44444444);
      // stripHtml(articleData.current)
      // console.log(!regex.test(articleData.current), 34534534578678);
      console.log(!regex.test(titleRef.current), 'title');
      console.log(articleData);
      if (!regex.test(articleData.current) || !regex.test(titleRef.current)) {
        createN();
        const count = await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .doc(labelRef.current)
          .get();
        console.log(count, 123423435);

        let updatedcount = count.data();
        updatedcount = updatedcount['count'] + 1;
        await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .doc(labelRef.current)
          .set({count: updatedcount}, {merge: true})
          .then(() => console.log('hurray'))
          .catch(() => console.log('hurray error00'));
        console.log(updatedcount, 98765);
      }
    } catch (e) {
      console.log(e);
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
      if (noteIdExist.current) {
        console.log(noteIdExist,'hi');
        dispatch(loadImage({noteId: noteId, uri: img.current}));
      }
      else if(noteNewId.current){
        console.log(noteNewId.current,'please');
        dispatch(loadImage({noteId: noteNewId.current, uri: img.current}));
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
  const headerHeight = useHeaderHeight();
  const THEME = theme;
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: THEME.BACKGROUND,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 0 : heightPercentageToDP('5.9%')
        }
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboardOffset}
        style={styles.subContainer}>
        <View>
          <Header headerText={isCompleteNew ? value : label} />
        </View>
        {isCompleteNew.current && (
          <DropdownComponent
            data={route.params?.labelData}
            value={value}
            setValue={setValue}
          />
        )}
        {/* <ScrollView style={styles.container} ref={scrollRef}> */}
        <TextInput
          onChangeText={text => {
            titleRef.current = text;
            setTitle(text);
          }}
          placeholder="Title"
          placeholderTextColor={THEME.NOTETEXT}
          value={title}
          style={[
            styles.title,
            {
              color: THEME.NOTETEXT,
            },
          ]}
        />
        {/* {
            true && */}
        <View>
          <FlatList
            horizontal
            data={imageData}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{paddingHorizontal: widthPercentageToDP('0.5%')}}>
                <Image
                  source={{uri: item}}
                  height={heightPercentageToDP('20%')}
                  width={heightPercentageToDP('20%')}></Image>
              </View>
            )}></FlatList>
        </View>

        {/* } */}
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          initialContentHTML={articleData.current}
          style={styles.rich}
          editorStyle={{
            backgroundColor: THEME.BACKGROUND,
            color: THEME.NOTETEXT,
          }}
          placeholder={'Start Writing Here'}
          onChange={text => {
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
          iconTint={'white'}
          selectedIconTint={'black'}
          disabledIconTint={'white'}
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
          ]}
          iconMap={{
            [actions.insertImage]: () => (
              <UserImage photo={photo} setPhoto={setPhoto} />
            ),
          }}
        />
        {/* <UserImage photo={photo} setPhoto={setPhoto}/> */}
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withTheme(Note);
