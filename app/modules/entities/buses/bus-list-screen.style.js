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
    height:hp('12'),
    flexDirection:'row',
    backgroundColor:Colors.primary

  },
  subheader:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('2'),
    height:hp('7'),
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:Colors.white

  },
  subTitle:{
    fontSize:wp('3.8'),
    color:Colors.title
  },
  subText:{
    fontSize:wp('3.5'),
    color:Colors.text
  },
  title:{
    fontSize:wp('4'),
    color:Colors.white
  },
  content:{
    flex:1,
    
  },
  listContent:{
    flex:1,
    backgroundColor:Colors.secondaryBackground
  },
  backbutton:{
    width:wp('10'),
    height:wp('8'),

  },
  
  left:{
    alignItems:'flex-start',
    flexDirection:'column',
    width:wp('20')
  },
  right:{
    alignItems:'flex-end',
    flexDirection:'column',
    width:wp('20')
  },
  time:{
    fontSize:wp('4'),
    fontWeight:'500',
    color:Colors.title
  },
  carIcon:{
    width:wp('20'),
    height:wp('15')
  },
  duration:{
    backgroundColor:Colors.background,
    height:hp('6'),
    paddingHorizontal:wp('3'),
    color:Colors.white,
    borderRadius:wp('2')

  },
  durationTitle:{
    color:Colors.white,
  },
  timeTitle:{
    marginTop:hp('2'),
    fontSize:wp('3'),
    fontWeight:'500',
    color:Colors.primary
  },
  card:{
    backgroundColor:Colors.white,
    height:hp('25'),
    marginVertical:hp('2'),
  },
  cardItem:{
    backgroundColor:Colors.white,
    height:hp('7'),

  },
  cardTitleLeft:{
    padding:wp('1'),
    borderRadius:hp('10'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.text,
    fontSize:hp('1.4'),
    fontWeight:'500'
  },
  badge:{
    paddingVertical:wp('1'),
    paddingHorizontal:wp('2'),
    borderRadius:hp('0.5'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.white,
    backgroundColor:Colors.secondary
  },
  cardTitle:{
    color:Colors.white,
  },
  center:{
    width:wp('50'),
    alignItems:'center',
    justifyContent:'center'
  },
  centerborder:{
    backgroundColor:Colors.primary,
    width:wp('50'),
    height:hp('0.2'),
    alignItems:'center',
    justifyContent:'center'
  },
  price:{
    color:Colors.primary,
    fontWeight:'bold',
    fontSize:wp('4')
  },
  loadingview:{
    flex:1,
    width:wp('100'),
    alignContent:'center',
    backgroundColor:Colors.primary
  },
  lottieView: {
    height: 100,
    alignSelf: 'center',
  },
  
});
