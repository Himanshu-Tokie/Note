import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      backgroundColor: 'rgb(249, 248, 253)',
    },
    editor: {
      backgroundColor: 'rgb(249, 248, 253)',
      borderColor: 'black',
      borderWidth: 0,
    },
    rich: {
      minHeight: 300,
      // flex: 1,
      borderRadius:0,
      borderWidth:0,
      backgroundColor:'red'
    },
    // text under rich 
    richeditor:{
      color:'black',
      fontFamily:'Nunito'
    },
    richBar: {
      height: 50,
      backgroundColor: 'rgb(107,78,255)',
    },
    text: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    tib: {
      textAlign: 'center',
      color: '#515156',
    },
    title:{
      fontFamily:'Nunito',
      fontSize:20,
      paddingVertical:20,
      // paddingLeft:
    },
    subContainer:{
      marginHorizontal:16
    }
  });
  