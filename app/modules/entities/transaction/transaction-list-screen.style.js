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
  contentHeader:{
    flex:1,
    alignItems:'center',
    backgroundColor:Colors.white,
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
    alignItems:'center',
    flexDirection:'column',
    width:wp('20')
  },
  right:{
    width:wp('20'),
    alignItems:'center',
    flexDirection:'column',
  },
  cardAmount:{
    fontSize:15,
    fontWeight:'500',
    color:Colors.title,
    textAlign:'center'
  },
  time:{
    fontSize:wp('4'),
    fontWeight:'500',
    color:Colors.title
  },
  carIcon:{
    width:wp('10'),
    height:wp('10'),
    tintColor:Colors.secondary
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
    height:hp('15'),
    marginVertical:hp('0.5'),
    marginHorizontal:wp('1'),
    borderRadius:wp('2'),
    padding:wp('1')

  },
  cardItem:{
    backgroundColor:Colors.white,
    height:hp('7'),

  },
  cardTitle:{
    marginTop:hp('2'),
    borderRadius:hp('10'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.title,
    fontSize:hp('2.3'),
    fontWeight:'400',
  },
  cardText:{
    marginTop:hp('1'),
    borderRadius:hp('10'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.text,
    fontSize:hp('1.3'),
    fontWeight:'400'
  },
  cardTime:{
    marginTop:hp('1'),
    borderRadius:hp('10'),
    justifyContent:'center',
    alignItems:'center',
    color:Colors.text,
    fontSize:hp('1.3'),
    fontWeight:'400',
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
  

  textStyle:{
    color:Colors.white,
  },

  activeTextStyle:{
    color:Colors.white,
  },

  center:{
    width:wp('55'),
    alignItems:'center',
    justifyContent:'center'
  },
  centerborder:{
    width:wp('50'),
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
  bottomSection:{
      flex:1,
      flexDirection:'row',
      
  },
  bottomCol:{
    flex:1,
    backgroundColor:Colors.background,
    justifyContent:'center',
    alignItems:'flex-start',
    height:hp('7'),
    margin:wp('2'),
    paddingHorizontal:wp('2'),
    borderRadius:wp('1')
  },
  rowCal:{
    flex:0.8,
    flexDirection:'row',
  },
  colorCard:{
    width:wp('3'),
    height:wp('3'),
    backgroundColor:Colors.primary,
    borderRadius:wp('100'),
    marginTop:wp('2'),
  },
  totalAmount:{
    fontSize:16,
    marginLeft:wp('5'),
    fontWeight:'bold'
  },
  titleCard:{
    fontSize:16,
    color:Colors.title,
    marginTop:hp('0.5'),
    marginLeft:wp('1')
  },
  cardLeft:{
    width:wp('5'),
    height:wp('5'),
    backgroundColor:Colors.primary,
    borderRadius:wp('1'),
    marginTop:wp('2'),
    marginHorizontal:wp('1')
  },
  
});
