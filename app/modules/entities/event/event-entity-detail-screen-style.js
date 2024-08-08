import { StyleSheet } from 'react-native'

import { ApplicationStyles,Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background,
  },
  thumbnail:{
    flex:1,
    height:hp('30%'),
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  uploadButton:{
    alignSelf:'flex-end',
    margin:10,
    backgroundColor:Colors.white,
    borderRadius:100,
    height:hp('5%'),
    width:wp('11%'),
    justifyContent:'center'
  },
  section:{
    flex:1,
    padding:wp('1%'),
    margin:wp('1%'),
    backgroundColor:Colors.white,
    borderRadius:wp('0.5%'),
  },
  headTitle:{
    color:Colors.charcoal,
    fontFamily:'Roboto-Regular',
    fontSize:18,
    fontWeight:'400',
    margin:10,
  },
  title:{
    color:Colors.greenish,
    fontSize:17,
    fontWeight:'300',
    fontFamily:'Quicksand-Bold',
    margin:10,
  },
  desc:{
    color:Colors.text,
    fontSize:16,
    fontFamily:'Quicksand-Regular',
    fontWeight:'400',
    margin:10,
  },
  sectionPayment:{
    flex:1,
    padding:wp('1%'),
    margin:wp('1%'),
    backgroundColor:Colors.white,
    borderRadius:wp('0.5%'),
  },
  button:{
    flex:1,
    alignContent:'center'
  },
  modalContainer:{
    flex: 1,
    width:wp('100%'),
    
  },
  modalContent:{
    flex: 1,
    backgroundColor:Colors.white,
  },
  modaltitle:{
    color:Colors.primary,
    fontFamily:'Quicksand-Bold',
    fontSize:22,
    
  },
  modelList:{
    height:hp('100%'),

  }
})
