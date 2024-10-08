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
  },
  backbutton:{
    width:wp('20'),
    height:wp('18'),

  },
  card:{
    margin:hp('1'),
    width:wp('95'),
    flexDirection:'row',
    height:hp('11'),
    backgroundColor:Colors.white
  },
  left:{
    width:wp('25'),
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:wp('1'),
    borderBottomLeftRadius:wp('1'),
  },
  
  thumbail:{
    borderTopLeftRadius:wp('1'),
    borderBottomLeftRadius:wp('1'),
    width:wp('25'),
    height:wp('25'),
    resizeMode:'center'
  },
  row:{
    width:wp('62'),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  right:{
    width:wp('30'),
    flexDirection:'row',
    alignItems:'center'
  },
  spinner:{
    color:Colors.primary, 
    flexDirection:'column-reverse',
    width:wp('7'),
    height:wp('5'),
  },
  buttonStyle:{
    alignItems:'center',
    justifyContent:'center',
    width:wp('6'), 
    height:wp('6'),
    backgroundColor:Colors.primary,
  },
  inputStyle:{
    height:hp('4'),
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
    width:wp('55'),
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'space-between',
    paddingHorizontal:wp('2')
  },
  
  title:{
    fontSize:wp('3.5'),
    marginTop:hp('1.5'),
    color:Colors.title
  },
  price:{
    marginVertical:hp('0.5'),
    color:Colors.primary,
    fontWeight:'bold',
    fontSize:wp('5')
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
  footer:{
      flexDirection:'column',
      height:hp('20'),
      backgroundColor:Colors.white
  },
  footerRow:{
    height:hp('3'),
    flexDirection:'row',
    justifyContent:'space-between',
    margin:wp('2'),
    borderBottomColor:Colors.background,
    borderBottomWidth:1
  },
  footerRowTitle:{
      color:Colors.title,
      fontWeight:'400',
      fontSize:wp('3'),
      marginLeft:wp('4'),
  },
  footerRowPrice:{
    color:Colors.text,
    fontWeight:'700',
    fontSize:wp('3.5'),
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
  }
  
});
