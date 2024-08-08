import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes';

export default StyleSheet.create({
  content: {
    flex:1,
    justifyContent:'space-between',
    alignItems:'flex-start',
    marginTop:hp('0')
  },
  listContent: {
    flex:1,
   
  },
  imageBg: {
    width:wp('31'),
    height:wp('25'),

  },
  image:{
    width:wp('31'),
    height:wp('25'),
    resizeMode:'cover'

  },

  productName: {
    color: Colors.title,
    fontSize: 13,
    height:hp('3'),
    marginTop:wp('2'),
    fontWeight: '500',
    textAlign:'left',
    marginHorizontal:wp('1')

  },
  productPrice: {
    color: Colors.primary,
    fontSize: 13,
    marginTop:wp('1'),
    fontWeight: '500',
    textAlign:'left',
    marginHorizontal:wp('1')

  },
  card:{
    margin:wp('1'),
    marginHorizontal:wp('1'),
    borderRadius:wp('1'),
    width:wp('31'),
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    backgroundColor:Colors.white,

  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:wp('1'),
    width:wp('30'),
  },
  left:{
    width:wp(20)
  },
  right:{
    width:wp(10),
    flexDirection:'row'
  },
  ratingIcon:{
    width:wp('2.5'),
    height:wp('2.5'),
    marginTop:wp('1.5')
  },
  ratingNumber:{
    color:Colors.text,
    fontSize:12,
    marginTop:wp('1')

  },
  button:{
    width:wp('9'),
    height:wp('7'),
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:wp(2)
  }
});
