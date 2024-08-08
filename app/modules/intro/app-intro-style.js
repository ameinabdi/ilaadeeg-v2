import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContent: {
    flex:1,
    height: hp('100'),
  },
  content: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  
  imageStyle: {
    width:hp('45%'),
    height:hp('45%'),
    resizeMode:'contain',
    alignSelf: 'center',
  },
  
  background: {
    flex:1,
   },
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: "column",


  },
  language:{
    width:wp('20'),
    height:wp('10'),
    justifyContent:'center',
    borderRadius:wp('1'),
    backgroundColor:Colors.transparent
  },
  textInputPicker: {
    marginTop:0,
    paddingHorizontal:5,
    width:'100%',
    color: Colors.white,
  },
  picker:{
    backgroundColor:Colors.primary,
    color: Colors.white,

   },
   selectPicker:{
    flexDirection:'row',
    justifyContent:'center',
    color: Colors.white,

  },
  headers:{
    flex:1,
    width:wp('100'),
    height:hp('40'),
    padding:hp('2'),
    marginTop:hp('3'),
    flexDirection:'row',
    justifyContent:'space-between',
  },
  footer:{
    width:wp('100%'),
    height:hp('56%'),
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:Colors.transparent,
    borderTopLeftRadius:wp('3'),
    borderTopRightRadius:wp('3'),
    paddingTop:hp('5')
  },
  listRow:{
    flex:1,
    flexDirection:'row',
    marginVertical:wp('1'),
    width:wp('99'),
    height:hp('5'),
    alignItems:'center',
    backgroundColor:Colors.background
  },
  listTitle:{
    marginLeft:wp('5%'),
    fontSize:18,
    color:Colors.title
  },
  title: {
    fontSize: 30,
    fontWeight:'700',
    color: Colors.white,

  },
  text: {
    margin:20,
    fontSize:18,
    fontWeight:'300',
    color: Colors.white,
    textAlign: 'center'


  },
  languageTitle: {
    margin:10,
    fontSize:16,
    fontWeight:'300',
    color: Colors.white,
    textAlign: 'center'


  },
  paymentTypeIcon:{
    width:wp('7%'),
    height:wp('7%'),
    marginLeft:wp('2'),
    backgroundColor:Colors.primaryBg,
    borderRadius:wp('100')
  },
  selectTitle:{
    fontSize:16,
    color:Colors.white,
    fontWeight:'500',
    marginLeft:wp('3%'),

  },
  dropdownIcon:{
    width:wp('5%'),
    height:wp('5%'),
    marginLeft:wp('3%'),
    tintColor:Colors.white

  },
  button: {
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('95%'),
    height:hp('5.6%'),
    margin: 5,
    backgroundColor:Colors.white,
    color: Colors.primary,
    borderRadius:5,
    borderWidth:1,
    borderColor:Colors.white
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
  },
  buttonIcon:{
    width:wp('13%'),
    height:wp('13%'),

  },
  buttonGuest: {
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('95%'),
    height:hp('5.6%'),
    margin: 5,
    backgroundColor:'#F30453',
    color: Colors.primary,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#F30453',
  },
  buttonGuestText: {
    color: Colors.white,
    fontSize: 16,
  },

   buttonSkip: {
    alignItems:'center',
    justifyContent:'center',
    width: wp('25%'),
    height:hp('4.6%'),
    color: Colors.primary,
    backgroundColor:Colors.transparent
  },
  buttonSkipText: {
    color: Colors.white,
    fontSize: 16,
  },
  
  buttonIconVidoes:{
    width:wp('15%'),
    height:wp('15%'),
  },
  imageBg:{
    flex:1,
    width:wp('100'),
    height:hp('100'),
  }
})