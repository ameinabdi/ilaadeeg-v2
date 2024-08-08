import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height:hp('5%'),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems:'flex-start',
    marginVertical: Metrics.smallMargin,

  },
  title: {
    color: Colors.white,
    fontSize:20,
    fontWeight:'bold',
    margin:10,
    alignSelf:'flex-start'
  },

 
  list:{
   
  },
  row: {
    flex: 1,
    height:hp('14%'),
    flexDirection:'row',
    backgroundColor: Colors.white,
    margin: Metrics.smallMargin,
    borderRadius:hp('1%'),
  },
  
  left:{
    height:hp('14%'),
    width:wp('30%'),

  },
  thumbnail:{
    flex:1,
    width:wp('30%'),
    borderTopLeftRadius:hp('1%'),
    borderBottomLeftRadius:hp('1%'),
  },
  
  middle:{
    height:hp('14%'),
    width:wp('44%'),

  },
  eventTitle:{
    marginTop:hp('1%'),
    marginLeft:hp('0.5%'),
    fontSize:hp('2%'),
    color:Colors.title,
    fontFamily:'Poppins-Regular'

  },
  eventSubTitle:{
    marginTop:hp('2%'),
    fontSize:hp('1.5%'),
    marginLeft:hp('0.5%'),
    color:Colors.coal,
    fontFamily:'Poppins-Regular'

  },
  eventlocation:{
    marginTop:hp('2%'),
    fontSize:hp('1.2%'),
    marginLeft:hp('0.5%'),
    color:Colors.text,
    fontFamily:'Poppins-Regular'
  },
  right:{
    alignSelf:'flex-end',
    height:hp('14%'),
    width:wp('23%'),
    position:'absolute',
    right:0,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: Colors.primary,
    borderTopRightRadius:hp('1%'),
    borderBottomRightRadius:hp('1%'),

  },
  eventDate:{
    fontSize:hp('2.4%'),
    marginLeft:hp('0.5%'),
    width:50,
    textAlign:'center',
    color:Colors.white,
    fontFamily:'Poppins-Regular'
  },
  eventTime:{
    fontSize:hp('2%'),
    marginLeft:hp('0.5%'),
    color:Colors.white,
    fontFamily:'Poppins-Regular'

  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
  label: {
    textAlign: 'center',
    color: Colors.snow,
  },
  listContent: {
    paddingTop: Metrics.baseMargin,
    backgroundColor:Colors.secondbg

  },
 
})
