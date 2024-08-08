import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../themes';

export default StyleSheet.create({
  container: {
    flex:1,
    height:hp('100'),
    backgroundColor: Colors.background,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  animation:{
    marginTop:wp('15'),
    width:wp('80'),
    height:wp('80')
  },
  title: {
    marginTop:wp('45'),
    textAlign: 'center',
    fontSize: 20,
    color: Colors.title,
    fontWeight: '600',
  },
  text: {
    marginTop:wp('5'),
    textAlign: 'center',
    fontSize: 16,
    color: Colors.title,
    fontWeight: '300',
  },
  button:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('90%'),
    height:hp('7%'),
    marginTop: hp('3'),
    backgroundColor:Colors.primary,
    color: Colors.primary,
    borderRadius:wp('1')
   },
   Backbutton:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:1,
    width: wp('90%'),
    height:hp('7%'),
    marginTop: hp('3'),
    backgroundColor:Colors.secondary,
    color: Colors.secondary,
    borderRadius:wp('1')
   },
   buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});
