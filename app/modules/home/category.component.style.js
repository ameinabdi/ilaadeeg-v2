import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes';

export default StyleSheet.create({
  content: {
    flex:1,
    marginTop:hp('0.5'),
    paddingVertical:hp('1'),
  },
  listContent: {
    
  },
  imageBg: {
    width:wp('15'),
    height:hp('7'),
    justifyContent:'center',
    alignItems:'center',
    
  },
  image:{
    width:wp('15'),
    height:hp('7'),
    resizeMode:'contain',
   
  },
  imageall:{
    width:wp('8'),
    height:wp('8'),
    resizeMode:'cover',
    tintColor:Colors.primary
  },
  text: {
    color: Colors.title,
    fontSize: 14,
    marginTop:hp('0.01'),
    fontWeight: '400',
    textAlign:'center',

  },
  count: {
    color: Colors.coal,
    fontSize: 12,
    marginBottom:hp('0.01'),
    fontWeight: '400',
    textAlign:'center',

  },
  card:{
    margin:wp('1'),
    borderRadius:wp('1'),
    width:wp('31'),
    height:wp('32'),
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:Colors.white,
  },
});
