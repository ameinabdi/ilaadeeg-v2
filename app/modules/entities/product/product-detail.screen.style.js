import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes';

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.white,
  },
  headerContainer:{
    width:wp('100'),
    height:hp('40'),
    backgroundColor:Colors.white

  },
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('3'),
    height:hp('10'),
    flexDirection:'row',
    backgroundColor:Colors.primary

  },
  headerMenu:{
   flexDirection:'column',
   justifyContent:'flex-start',
   alignItems:'flex-start',
   backgroundColor:'rgba(52, 52, 52, 0.8)'  
  },
  haederTitle:{
    fontSize:wp('4'),
    color:Colors.white
  },
  rightHeader:{
    flex:1,
    width:wp('20'),
    marginRight:wp('2'),
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  wrapper:{
    height:hp('30'),
  },
  backbuttonContainer:{
    backgroundColor:"rgba(0, 0, 0, 0.5)",
    width:wp('10'),
    height:wp('10'),
    borderRadius:wp('20'),
    alignItems:'center',
    justifyContent:'center',

  },
  sharebutton:{
    width:wp('10'),
    height:wp('18'),
    marginTop:hp('7')
  },
  swiperList:{
    height:hp('40'),

  },
  wrapperItems:{
    marginTop:-hp(4),
    height:hp(4),
    width:wp('100'),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'black',
    opacity: 0.7

  },
  wItemView:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:wp('2')
  },
  wItemText:{
    color:Colors.white,
    fontSize:14,
    marginRight:wp('2'),
  },
  subHeader:{
  },
  productHeaderView:{
    flex:1,
    flexDirection:'column',
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor:Colors.white,
    padding:wp('2')

  },
  productDescView:{
    flex:1,
    flexDirection:'column',
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor:Colors.white,
    padding:wp('2'),
    marginTop:hp(1),

  },
  SelectedimageSlider:{
    width:wp('14'),
    height:wp('14'),
    resizeMode:'cover',
    borderRadius:wp('2'),
    borderWidth:2,
    borderColor:Colors.primary,
    marginHorizontal:wp('1'),
  },
  imageSlider:{
    width:wp('12'),
    height:wp('12'),
    resizeMode:'cover',
    borderWidth:2,
    borderColor:Colors.primary,
    marginHorizontal:wp('1'),
  },
  content:{
    flex:1,
    backgroundColor:Colors.background,
    width:wp('100'),
  },
  footer:{
    height:hp('7'),
    backgroundColor:Colors.white,
    justifyContent:'space-between',
    width:wp('100'),
    padding:wp('5'),
    flexDirection:'row',
  },
  footercart:{
    height:hp('10'),
    justifyContent:'center'
  },
  cardColors:{
      flex:1,
      height:hp('7'),
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:Colors.background
  },
  title:{
    fontSize:wp('4'),
    color:Colors.title
  },
  productName:{
    fontSize:wp('5'),
    color:Colors.title
  },
  productDescription:{
    fontSize:16,
    color:Colors.title,
    marginVertical:hp('2'),
    fontWeight:'bold'
  },
  productDescriptionText:{
    fontSize:14,
    fontWeight:'bold',
    color:Colors.text
  },
  priceTitle:{
    fontSize:wp('5'),
    color:Colors.primary
  },
  footerprice:{
    marginTop:hp(1),
    fontWeight:'bold',
    fontSize:wp('4'),
    color:Colors.primary
  },
  callButton:{
    marginTop:hp(2),
    flex:1,
    height:hp('5'),
    backgroundColor:Colors.primary,
  },
  callButtonText:{
    fontSize:wp('4'),
    color:Colors.white,
    marginLeft:wp('2')
  },
  buttonCart:{
    width:wp('30'),
    height:hp('4'),
    backgroundColor:Colors.primary,
    paddingHorizontal:wp('3'),
  },
  buttonCartText:{
    fontSize:wp('4'),
    color:Colors.white
  },

  buttonReport:{
    width:wp('90'),
    height:hp('4'),
    paddingHorizontal:wp('3'),
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'

  },
  buttonReportText:{
    marginLeft:wp('1'),
    fontSize:wp('3.5'),
    color:Colors.bloodOrange
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
card:{  
    flex:1,
    backgroundColor:Colors.white,
    margin:wp('2'),
    borderRadius:wp('2'),
    justifyContent:'center',
    alignItems:'center',
    
  },
  cardfooter:{  
    flex:1,
    backgroundColor:Colors.white,
    marginTop:wp('0'),
    padding:hp('5'),
    marginHorizontal:wp('2'),
    borderRadius:wp('2'),
    justifyContent:'center',
    alignItems:'center'
    
  },
  menu:{
      padding:wp('3'),
      marginTop:hp('2'),
      width:wp('100'),
      flexDirection:'row',
      height:hp('10'),
      alignItems:'center',
      justifyContent:'center',
  },
  left:{
      width:wp('30'),
      flexDirection:'column'
  },
  leftTitle:{
      fontSize:wp('3.5'),
      fontWeight:'300',
      textAlign:'left',
      color:Colors.text,
      marginLeft:wp('1'),
      marginTop:wp('2')
  },
  leftText:{
    padding:wp('1'),
    fontSize:wp('5'),
    fontWeight:'600',
    textAlign:'left',
    color:Colors.title,
  },
  right:{
    width:wp('30'),
    flexDirection:'column',
    alignItems:'flex-start'
  },
  
  rightTitle:{
    fontSize:wp('3.5'),
    fontWeight:'300',
    textAlign:'left',
    color:Colors.text,
    marginRight:wp('1'),
  },
  rightText:{
    padding:wp('1'),
    fontSize:wp('5'),
    fontWeight:'600',
    textAlign:'left',
    color:Colors.title,
    marginRight:wp('1'),
  },
  center:{
    width:wp('25'),
    alignItems:'flex-start',
    justifyContent:'center'
  },
  centerTitle:{
    fontSize:wp('3.5'),
    fontWeight:'300',
    color:Colors.text,
    marginLeft:wp('2'),
    marginTop:wp('2')
},
centerText:{
  padding:wp('1'),
  fontSize:wp('5'),
  fontWeight:'600',
  textAlign:'left',
  color:Colors.title,
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
    backgroundColor:Colors.primary
  },
  cardTitle:{
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
  // footer:{
  //     flexDirection:'column',
  //     height:hp('15'),
  // },
  // footerTitle:{
  //     color:Colors.title,
  //     fontWeight:'400',
  //     fontSize:wp('3'),
  //     marginLeft:wp('4'),
  // },
  // footerText:{
  //   color:Colors.text,
  //   fontWeight:'700',
  //   fontSize:wp('3'),
  //   marginRight:wp('4'),
  //   textAlign:'right',
  // },
  button:{
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('95%'),
    height:hp('5%'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('1')
   },
   buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  steering:{
      tintColor:Colors.white,
      width:wp('15'),
      height:wp('15')
  },

  model:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  modelContainer:{
    borderTopLeftRadius:wp(2),
    borderTopRightRadius:wp(2),
    width:wp('100'),
    backgroundColor:Colors.white,
    height:hp('80'),
    justifyContent:'flex-start',
    alignItems:'center',
  },
  modelheader:{
    height:hp('6'),
    flexDirection:'row',
  },
  modelTitle:{
    color:Colors.text,
    fontSize:16,
  },
  closebutton:{
    margin:wp('4')
  },
  modalContent:{
    flex:1,
    width:wp('100'),
    backgroundColor:Colors.background
  },
  selection:{
    marginLeft:wp('2'),
  },
  selector:{
    marginVertical:hp('0.5')

  },
  row: {
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
   backgroundColor: Colors.white

  },
  textInput: {
    marginLeft:10,
    height:hp('5.5'),
    width:'95%',
    color: Colors.text,
  },
  buttonSave:{
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:2,
    width: wp('98%'),
    height:hp('5%'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('0.5')
   },
   buttonSaveText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight:'bold'
  },
  
});
