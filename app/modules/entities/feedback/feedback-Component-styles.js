import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes';

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.background,
  },
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('1'),
    height:hp('7'),
    flexDirection:'row',
    backgroundColor:Colors.white
  },
  haederTitle:{
    fontSize:wp('4'),
    color:Colors.title,
    fontWeight:'bold',

  },
  content:{
    flex:1,
  },
  backbutton:{
    width:wp('10'),
    height:wp('8'),

  },
  listContent:{
    paddingBottom:hp(4)

  },
  card:{
    marginTop:hp('1'),
    width:wp('100'),
    flexDirection:'row',
    backgroundColor:Colors.white
  },
  left:{
    width:wp('25'),
    flexDirection:'column',
    alignItems:'center',
    padding:wp('2'),
    justifyContent:'flex-start'
},
newButton:{
    backgroundColor:Colors.primary,
    height:hp('4'),
    width:wp('20'),
    justifyContent:'center',
    flexDirection:'row',
},
newButtonText:{
    fontSize:wp('3.5'),
    color:Colors.white
  },
  username:{
    marginTop:hp('1'),
    fontSize:wp('3'),
    color:Colors.title
  },
  date:{
    fontSize:wp('4'),
    fontWeight:'400',
    color:Colors.white
  },
  center:{
    flex:1,
    flexDirection:'column' ,
    padding:wp('2'),
  },
  col:{
    flexDirection:'row'
  },
  title:{
    fontSize:wp('3.5'),
    color:Colors.title,
    marginVertical:10,
    marginLeft:10
  },
  text:{
    marginVertical:10,
    marginHorizontal:hp('0.5'),
    fontSize:wp('3.5'),
    color:Colors.text
  },
  row:{
    flexDirection:'row' ,
    alignItems:'flex-start',
    justifyContent:'space-between',
   
  },
  detail:{
    flex:1,
    flexDirection:'row',
    backgroundColor:Colors.background
   
  },
  detailText:{
    color:Colors.text,
    fontWeight:'500',
    fontSize:wp('3'),
    margin:hp('1')
 },
  right:{
    flexDirection:'row'
  },

  detailLeft:{
      width:wp('20'),
      height:hp('4'),
      borderRadius:wp('1'),
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:Colors.primary

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
  model:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  modelView:{
    height:hp('60'),
    width:wp('100'),
    padding:wp('2'),
    backgroundColor:Colors.white
  },
  modelHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
  modelTitle:{
    fontSize:wp('4'),
    marginTop:hp('1'),
    color:Colors.primary
    
  },
  modelContent:{
    flex:1,
  },
  
});
