import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors,Metrics } from '../../../shared/themes'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,

  },
  
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('6'),
    height:hp('13'),
    flexDirection:'row',
    backgroundColor:Colors.primary
  },
  backbutton:{
    width:wp('20'),
    height:wp('14'),

  },
  Thumbnail:{
    borderWidth:4,
    borderColor:Colors.bloodOrange
},
  
thumbnail:{
  width:120,
  borderRadius:100,
  height:120,
  alignSelf:"center"
 },
 name:{
   color:Colors.white,
   marginTop:10,
   fontSize:22,
   fontWeight:'200'
  },
  profile:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:Colors.primary,
    padding:20,

  },
  section: {
    marginTop: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderBottomColor:Colors.secondbg,
    borderBottomWidth:1
  },
  sectionTitle:{
    color:Colors.text,
    fontSize:18,
    marginLeft:10
  },
  content:{
    flex:3,
    backgroundColor:Colors.background,
  },
  fullname:{
    fontSize:20,
    color:Colors.white,
    marginTop:10,
    textAlign:'center',
    alignSelf:"center"

 },
 id:{
    alignSelf:'center',
    fontWeight:'800',
    marginTop:10,
    fontSize:20,
    color:Colors.white,
    textAlign:'center',
 },
  title:{
    color:Colors.primary,
    marginTop:10,
    fontSize:18,
    fontWeight:'200'
  },
  contenTitle:{
    color:Colors.text,
    margin:10,
    fontSize:18,
    fontWeight:'500'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: Colors.jhipsterBlue,
    borderColor: Colors.jhipsterBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },





  card:{
    margin:wp('1'),
    width:wp('97'),
    flexDirection:'row',
    height:hp('6'),
    borderRadius:wp('1'),
    backgroundColor:Colors.white
  },
  left:{
    width:wp('13'),
    borderRadius:wp('1'),
    backgroundColor:Colors.primary,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  menuIcon:{
    width:wp('5'),
    height:wp('5'),
    tintColor:Colors.white
  },
  title:{
    fontSize:wp('4'),
    fontWeight:'300',
    color:Colors.title
  },
  center:{
    width:wp('65'),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:wp('2')
  },

  text:{
    marginTop:hp('0.5'),
    fontSize:wp('3'),
    color:Colors.text
  },

  right:{
    width:wp('0'),
    flexDirection:'row'
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
  }
  
})
