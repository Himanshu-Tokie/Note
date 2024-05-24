import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const image = createSlice({
  name: 'image',
  initialState: {
    imageUri: {},
  },
  reducers: {
    loadImage: (state, action) => {
      const noteId = action.payload.noteId;
      const uri = action.payload.uri;
      console.log(uri, 8);
      console.log(noteId);
      if (state.imageUri.hasOwnProperty(noteId)) {
        const imageData = state.imageUri;
        imageData[noteId] = [...imageData[noteId], ...uri];
        state.imageUri = imageData;
      } else {
        console.log('else image');
        const imageData = state.imageUri;
        imageData[noteId] = uri;
        state.imageUri = imageData;
        
      }
      AsyncStorage.setItem('Images', JSON.stringify(state.imageUri)).then(()=>{console.log('done');
      });
      console.log(state.imageUri, 'all image saved');
    },
    deleteImage: (state, action) => {},
    getFromAsyncStorage: (state, action) => {
      state.imageUri = action.payload.savedImage;
    },
  },
});
export const loadImageFromStorage = () => async dispatch => {
  const savedImage = await AsyncStorage.getItem('Images');
  if (savedImage) {
    dispatch(getFromAsyncStorage(savedImage));
  }
};

export const {loadImage, getFromAsyncStorage, getImageList} = image.actions;

export default image.reducer;
