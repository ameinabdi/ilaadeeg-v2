import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApplicationStyles, Colors,Metrics  } from '../../shared/themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white,

  },
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('6'),
    height:hp('13'),
    flexDirection:'row',
    backgroundColor:Colors.white
  },
  backbutton:{
    width:wp('10'),
    height:wp('8'),

  },
  content: {

  },
  subheader:{
    flex:1,
    width:wp(95),
    height:wp(23)
  },
  title:{
    color:Colors.primary,
    fontSize:26,
    textAlign:'center',
  },
  card:{
      paddingTop:10,
     justifyContent:'flex-end',
     borderRadius:10,
     height:600,
     marginBottom:100
  },
  cardView:{
      backgroundColor:Colors.background,

  },
  carditem:{
    flexDirection:'column'
    

  },
  animation:{
   width:200,
   height:200,
   alignSelf:'center',
   marginBottom:10,
  },
  row:{
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  rowLabel: {
    color: Colors.charcoal,
    marginLeft:Metrics.doubleBaseMargin,
  },
  input:{
   paddingTop:10,
   flexDirection:'row',

  },
  subtitle:{
    color:Colors.primary,
    fontSize:16,
    marginTop:20,
    fontWeight:'bold'
  },
  error:{
    color:Colors.secondary,
    fontSize:16,
    textAlign:'center',
    marginTop:10,
   },
   wrapper:{
    flex:1,
    marginTop:hp('5'),
    alignItems:'center',
  },
  textInput: {
    width: wp('95%'), 
    backgroundColor:Colors.background,
    height: 50,
    paddingHorizontal:10,
    marginHorizontal:wp('5'),
    alignSelf:'center'
    
    },
  dateInput: {
    marginTop:hp('1'),
    backgroundColor:Colors.background,
    width: wp('95%'), 
    height: 50,
    paddingTop:wp('3'),
    paddingLeft:wp('2'),
    marginHorizontal:wp('5'),
    color:Colors.text,
    fontSize:wp('4'),
    fontWeight:'500'

   },
   inputDate:{
    marginTop:wp('0.5'),
    color:Colors.text,
    fontSize:wp('4'),
    fontWeight:'500'
},
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center',
  },
  button: {
    alignSelf:'center',
    width:wp('95'),
    height:hp('6'),
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginTop:40
  },
  buttontext:{
    color: Colors.white,
    fontSize:16
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: wp('15'),
    height: hp('8'),
    backgroundColor:Colors.background,
    borderRadius:wp('1'),
    color:Colors.primary,
    fontSize:wp('6'),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor:Colors.primary
  },
  

  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },




  footer:{
    color: Colors.white,
    fontSize:13,
    alignSelf:'center',
    marginBottom:30
  },
  verified:{
    fontSize: 25,
    color: Colors.primary,
    alignSelf: 'center',
  },
  text:{
      marginTop:10,
      fontSize:15,
      color:Colors.charcoal,
      textAlign:'center'
  },
  resend: {
     height:40,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  resendtext:{
      color:Colors.primary,
      fontSize:20,
      fontWeight:'700'
  }
})