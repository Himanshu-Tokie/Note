import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(249, 248, 253)',
    flex: 1,
    paddingHorizontal: 16,
  },
  subcontainer: {
    paddingTop: RFValue(20),
  },
  welcome: {
    color: 'rgb(182,176,217)',
    fontFamily: 'Nunito',
    paddingBottom: RFValue(2),
    fontWeight:'600'
  },
  NoteTaking: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    fontSize: RFValue(22),
  },
  header: {
    paddingHorizontal: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flexGrow:''
    // flexGrow:''
  },
  innerHeader: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  labels: {
    // padding:0
    //     borderRadius:2,
    // borderColor:'black',

    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    color: 'white',
    fontSize: 20.48,
    fontWeight: '800',
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 358,
    height: 162,
  },
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 16,
    paddingTop: RFValue(28),
    paddingBottom:RFValue(26)
    // paddingTop:45,
    // paddingBottom:30
  },
  size: {
    fontSize: 12.8,
    color: 'rgb(153, 144, 254)',
    fontWeight: 'bold',
  },
  imageInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  footer:{
    flexDirection:'row',
    paddingHorizontal:16,
    justifyContent:'space-between',
    backgroundColor:'white',
    marginHorizontal:18,
    borderRadius:15,
    paddingVertical:RFValue(10),
    marginTop:15
  },
  // footerInner:{
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   paddingHorizontal:10
  // }
});
