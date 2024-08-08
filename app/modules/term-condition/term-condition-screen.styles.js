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
    title:{
      fontSize:wp('4'),
      color:Colors.white
    },
    backbutton:{
      width:wp('20'),
      height:wp('18'),
  
    },
    content:{
      flex:1,
    },
  animation:{
    width:wp('60'),
    height:wp('60')
  },
  left:{
    width:wp('20'),
    marginTop:hp('1'),
  },
  center:{
    width:wp('60'),
    marginTop:hp('1'),

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
