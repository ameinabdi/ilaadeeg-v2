import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { title } from 'process';

export default StyleSheet.create({
  mainContent: {
    flex:1,
    height: hp('100'),
    backgroundColor: Colors.background
  },
 
  header:{
    backgroundColor:Colors.background,
    height:hp('20'),
    width:wp('100'),
    marginTop:hp('5'),
    justifyContent:'center',
    alignItems:'center'
  },
  content: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  logo:{
    width:hp('15'),
    height:hp('15')
  },
  title:{
    fontSize:30,
    color:Colors.primary,
    fontWeight:'bold',
    marginTop:hp('2')
  },
  text:{
    fontSize:16,
    color:Colors.text,
    marginTop:hp('2')
  },
  
  button: {
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('95%'),
    height:hp('7%'),
    marginTop:hp('5'),
    margin: 5,
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:2,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft:wp('5')
  },
  buttonIcon:{
    width:hp('3%'),
    height:hp('3%'),
    tintColor:Colors.white
  },
  socailButtonIcon:{
    width:hp('3%'),
    height:hp('3%'),
  },
  textOr:{
    fontSize:16,
    color:Colors.borders,
    marginVertical:hp('2')
  },
  
  socailButton: {
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('45%'),
    height:hp('7%'),
    margin: 5,
    backgroundColor:Colors.third,
    color: Colors.primary,
    borderRadius:2,
  },
  row:{
    flexDirection:'row'
  }
  
})