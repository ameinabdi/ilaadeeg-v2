import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes';

export default StyleSheet.create({
    container: {
      flex:1,
      height:hp('100'),
      backgroundColor: Colors.background,
    },
    header:{
      paddingHorizontal:wp('2'),
      paddingTop:hp('7'),
      height:hp('13'),
      flexDirection:'row',
      backgroundColor:Colors.primary
    },
    cardColors:{
        flex:1,
        height:hp('7'),
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:Colors.background
    },
    headerTitle:{
      fontSize:wp('4.5'),
      marginTop:-wp('2'),
      color:Colors.white,
      width:wp('50'),
    },
    backbutton:{
      width:wp('20'),
    },
    content:{
      flex:1,
    },
  animation:{
    width:wp('60'),
    height:wp('60')
  },
  language:{
    backgroundColor:Colors.white,
    width:wp('95'),
    height:wp('12'),
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:wp('1'),
    alignSelf:'center',
  },
  textInputPicker: {
    marginTop:0,
    paddingHorizontal:5,
    width:wp('100%'),
    color: Colors.background,
  },
  picker:{
    
    backgroundColor:Colors.primary
 
   },
   selectPicker:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:wp('93'),
    height:wp('11'),

  },
  footer:{
    width:wp('100%'),
    height:hp('20%'),
    justifyContent:'center',
    alignItems:'center'
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
    color: Colors.text,
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
    color:Colors.title,
    fontWeight:'500',
    marginLeft:wp('3%'),

  },
  dropdownIcon:{
    width:wp('5%'),
    height:wp('5%'),
    marginLeft:wp('3%'),

  },
  text: {
    marginTop:wp('5'),
    textAlign: 'center',
    fontSize: 18,
    color: Colors.text,
    fontWeight: '600',
  },
  footer:{
      marginTop:hp('5'),
      flexDirection:'row'
  },
  col:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingTop:1,
    width: wp('45%'),
    height:hp('10%'),
    marginVertical:hp('2'),
    marginHorizontal: hp('2'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('1')
   },
   colLarge:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingTop:1,
    width: wp('97%'),
    height:hp('10%'),
    marginVertical:hp('2'),
    marginHorizontal: hp('2'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('1')
   },
  icon:{
    tintColor:Colors.white,
    width:wp('5'),
    height:wp('5')
  },
  colText: {
    color: Colors.white,
    fontSize: 16,
  },
  button:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('90%'),
    height:hp('5%'),
    marginTop: hp('3'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('1')
   },
   buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});
