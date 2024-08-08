import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes';

export default StyleSheet.create({
  container: {
    flex:1,
    height:hp('100'),
    backgroundColor: Colors.background,
  },
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('6'),
    height:hp('13'),
    flexDirection:'row',
    backgroundColor:Colors.primary
  },
  haederTitle:{
    fontSize:wp('4'),
    color:Colors.white
  },
  content:{
    flex:1,
    backgroundColor: Colors.background,

  },
  listContent:{
    flex:1,
    backgroundColor: Colors.background,
  },
  loadingview:{
    flex:1,
    width:wp('100'),
    alignContent:'center',
    backgroundColor:Colors.primary
  },
  lottieView: {
    height: 100,
    alignSelf: 'center',
  },
  
  backbutton:{
    width:wp('10'),
    height:wp('8'),

  },
  card:{
    margin:hp('1'),
    width:wp('95'),
    flexDirection:'column',
    height:hp('22'),
    alignSelf:'center',
    borderRadius:wp('2'),
    backgroundColor:Colors.white
  },
  row:{ 
    width:wp('95'),
    height:hp('7'),
    justifyContent:'space-around',
    alignItems:'stretch',
    flexDirection:'row',
  },
  left:{
    flex:1,
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center'
},
provider:{
    fontSize:wp('6'),
    fontWeight:'bold',
    color:Colors.primary,
    height:40,
    margin:wp('4'),

  },
  providerIcon:{
    width:wp('25'),
    height:wp('10'),
    tintColor:Colors.white
  },
  date:{
    fontSize:wp('4'),
    fontWeight:'400',
    padding:wp('4'),
    color:Colors.primary
  },
  center:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:wp('2')
  },
  cardLogo:{
    width:wp('13'),
    height:wp('13'),
    marginLeft:wp('3'),
    marginTop:wp('3'),

  },
  account:{
    fontSize:wp('7'),
    fontWeight:'bold',
    color:Colors.primary
  },
  text:{
    marginTop:hp('0.5'),
    fontSize:wp('3'),
    color:Colors.text
  },

  right:{
    width:wp('25'),
    flexDirection:'row',
    alignSelf:'flex-end',
    
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
  right:{
    width:wp('30'),
    flexDirection:'row'
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
  footer:{
      flexDirection:'column',
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
  modal:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer:{
    height:hp('50%'),
    borderTopLeftRadius:hp('1'),
    borderTopRightRadius:hp('1'),
    backgroundColor:Colors.white
  },
  modalHeader:{
    flexDirection:'row',
    padding:hp('2'),
    justifyContent:'space-between',

  },
  modelHeaderTitle:{
    color:Colors.primary,
    fontSize:wp('5%'),
    fontWeight:'500'
  },
  modalContent:{
   flex:1, 
   justifyContent:'flex-start',
  }
  
});
