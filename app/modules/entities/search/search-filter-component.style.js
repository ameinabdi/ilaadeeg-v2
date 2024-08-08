import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes';

export default StyleSheet.create({
  container: {
    flex:1,
    height:hp('100'),
    backgroundColor: Colors.white,
  },
  header:{
    paddingHorizontal:wp('0'),
    paddingTop:hp('6'),
    height:hp('13'),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:Colors.primary
  },
  haederTitle:{
    fontSize:wp('4'),
    color:Colors.white
  },
  body:{
    width:wp('85'),
    height:hp('5'),
  },
  
  content:{
    flex:1,
  },
  backbutton:{
    width:wp('10'),
    height:wp('8'),

  },
  row: {
    flexDirection:'column',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  rowLabel: {
    color: Colors.charcoal,
    fontSize:16
  },
  input:{
   marginTop:15,
   flexDirection:'row',
   backgroundColor: Colors.background

  },
  inputPicker:{
    marginTop:15,
    marginHorizontal:1,
    backgroundColor: Colors.background
 
   },
   textInputPicker: {
    marginTop:10,
    paddingHorizontal:5,
    height: 35,
    width:'100%',
    color: Colors.background,
  },
  selectView:{
    backgroundColor: Colors.background,
    height:hp('5.5'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('2'),
    alignItems:'center'
  },
  selectText:{
    color:Colors.title,
    fontSize:16,
  },
  selectIcon:{
    width:wp('5'),
    height:wp('5'),
    tintColor:Colors.text
  },
  inputIcon:{
    marginTop:10,
   },
  textInput: {
    marginLeft:10,
    height:hp('5.5'),
    width:'95%',
    color: Colors.text,
  },
  titleText:{
    alignSelf:'flex-start',
    marginHorizontal:5,
    color:Colors.primary,
    fontSize:30,
    marginTop:15,
    fontWeight:'bold',
    marginBottom:20,

  },
  card:{
    marginTop:hp('1'),
    width:wp('100'),
    flexDirection:'row',
    height:hp('13'),
    backgroundColor:Colors.white
  },
  left:{
    width:wp('25'),
    backgroundColor:Colors.primary,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
},
  profile:{
    width:wp('25'),
    flex:1,
    resizeMode:'cover'
  },
  day:{
    fontSize:wp('6'),
    fontWeight:'bold',
    color:Colors.white
  },
  date:{
    fontSize:wp('4'),
    fontWeight:'400',
    color:Colors.white
  },
  center:{
    width:wp('65'),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:wp('2')
  },
  
  title:{
    fontSize:wp('3'),
    marginTop:hp('1.5'),
    color:Colors.title
  },
  text:{
    marginTop:hp('0.5'),
    fontSize:wp('3'),
    color:Colors.text
  },

  right:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center', 
    alignItems:'center'
  },
  detail:{
    marginTop:hp('1'),
    padding:wp('2'),
    width:wp('100'),
    flexDirection:'row',
    height:hp('5'),
    backgroundColor:Colors.background
  },
  detailLeft:{
      width:wp('20'),
      height:hp('4'),
      borderRadius:wp('1'),
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:Colors.primary

  },
  detailLeftTitle:{
      color:Colors.white,
      fontWeight:'300',
      fontSize:wp('4')
  },
  detailRight:{
    width:wp('20'),
    height:hp('4'),
    borderRadius:wp('1'),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.secondary

},
detailRightTitle:{
    color:Colors.white,
    fontWeight:'300',
    fontSize:wp('3.5')
},
  menu:{
      padding:wp('2'),
      width:wp('100'),
      flexDirection:'row',
      height:hp('10'),
      backgroundColor:Colors.background
  },
  
  leftTitle:{
      fontSize:wp('3.5'),
      fontWeight:'300',
      textAlign:'left',
      color:Colors.title,
      marginLeft:wp('2'),
      marginTop:wp('2')
  },
  leftText:{
    borderWidth:1,
    borderColor:Colors.text,
    padding:wp('1'),
    marginTop:hp('1'),
    fontSize:wp('5'),
    fontWeight:'600',
    textAlign:'left',
    color:Colors.text,
  },
  
  rightTitle:{
    fontSize:wp('3.5'),
    fontWeight:'300',
    textAlign:'left',
    color:Colors.title,
    marginLeft:wp('2'),
  },
  rightText:{
    borderWidth:1,
    borderColor:Colors.text,
    padding:wp('1'),
    marginTop:hp('1'),
    fontSize:wp('5'),
    fontWeight:'600',
    textAlign:'left',
    color:Colors.text,
  },
  centerborder:{
    marginTop:hp('3'),
    backgroundColor:Colors.primary,
    width:wp('50'),
    height:hp('0.2'),
    alignItems:'center',
    justifyContent:'center'
  },
  duration:{
    backgroundColor:Colors.primary,
    height:hp('3'),
    paddingHorizontal:wp('3'),
    paddingVertical:wp('1'),
    color:Colors.white,
    borderRadius:wp('2')

  },
  durationTitle:{
    color:Colors.white,
  },
  seatView:{
      flex:1,
      marginVertical:hp('4')
  },
  seatcontent:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center'
  },
  seat:{
      width:wp('17'),
      height:wp('17'),
      borderRadius:wp('1'),
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:wp('5'),
      marginVertical:wp('6'),
      backgroundColor:Colors.third
  },
  seatTitle:{
      fontSize:wp('4'),
      color:Colors.white,
      fontWeight:'400'

  },
  selectedSeat:{
    width:wp('17'),
    height:wp('17'),
    borderRadius:wp('1'),
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:wp('5'),
    marginVertical:wp('6'),
    backgroundColor:Colors.primary
},
 
  buttonCard:{
    width:wp('5'),
    height:hp('2.5'),
    marginHorizontal:wp('1'),
    backgroundColor:Colors.primary,
    borderRadius:wp('0.5')

  },
  buttonTitle:{
    padding:wp('1'),
    borderRadius:hp('10'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.text,
    fontSize:hp('1.5'),
    fontWeight:'500'
  },
  badge:{
    paddingVertical:wp('1'),
    paddingHorizontal:wp('2'),
    borderRadius:hp('0.5'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.white,
    marginTop:hp('1'),
    backgroundColor:Colors.primary
  },
  badgeText:{
    color:Colors.white,
  },
  
  icon:{
      width:wp('8'),
      height:wp('8'),
      tintColor:Colors.primary
  },
  price:{
    color:Colors.primary,
    fontWeight:'bold',
    fontSize:wp('5')
  },
  footer:{
      flexDirection:'row',
      height:hp('15'),
  },
  footerTitle:{
      color:Colors.title,
      fontWeight:'400',
      fontSize:wp('3'),
      marginLeft:wp('4'),
  },
  footerText:{
    color:Colors.text,
    fontWeight:'700',
    fontSize:wp('3'),
    marginRight:wp('4'),
    textAlign:'right',
  },
  button:{
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    flex:1,
    marginHorizontal:wp('1'),
    height:hp('6%'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('0.5')
   },
   buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  buttonTrash:{
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    flex:1,
    marginHorizontal:wp('1'),
    height:hp('6%'),
    borderWidth:wp('0.5'),
    borderColor:Colors.delete,
    color: Colors.primary,
    borderRadius:wp('0.5')
   },
   buttonTrashText: {
    color: Colors.delete,
    fontSize: 16,
  },
  steering:{
      tintColor:Colors.delete,
      width:wp('15'),
      height:wp('15')
  }
  
});
