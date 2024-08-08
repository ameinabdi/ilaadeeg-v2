import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApplicationStyles, Colors  } from '../../shared/themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor:Colors.white,

  },
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('6'),
    height:hp('13'),
    flexDirection:'row',
  },

  backbutton:{
    width:wp('10'),
    height:wp('8'),

  },
  wrapper:{
    flex:1,
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
  editButton:{
    justifyContent:'flex-end',
    height:28,
    marginLeft:wp('1'),
    alignItems:'center',

  },
  animation:{
   width:hp('30'),
   height:hp('30'),
   alignSelf:'center',
   marginBottom:10,
  },
  row:{
    flexDirection:'row'
  },
  title:{
    color:Colors.primary,
    fontSize:16,
    textAlign:'center',
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
  textInput: {
    width: wp('80%'), 
    height: hp('10'),
    marginHorizontal:wp('5'),
    alignSelf:'center'
    
    },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center',
  },
  button: {
    alignSelf:'center',
    width:wp('90'),
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
  },
  model:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  modelView:{
    height:hp('70'),
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
  phonenumber:{
    marginTop:hp('5'),
    backgroundColor:Colors.secondaryBackground,
     width:wp('95'),
     height:hp('6')
   },
   modelButton:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('95%'),
    height:hp('5%'),
    marginTop: hp('4'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('1')
   },
   modelButtonText: {
    color: Colors.white,
    fontSize: 16,
  },

})