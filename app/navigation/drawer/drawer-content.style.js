import { StyleSheet } from 'react-native';

import { ApplicationStyles, Colors } from '../../shared/themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:Colors.primary,

 },
 header:{
    flex:1,
    height:hp('20%'),
    backgroundColor:Colors.primary,
    alignItems:'center',
    justifyContent:'center'
 },
 logo:{
    alignSelf:'center',
    width:wp('20%'),
    height:wp('20%'), 
    marginLeft:wp('10'),
    borderRadius:wp('10'),
 },
 title:{
     fontSize:wp('5'),
     color:Colors.white,
     marginLeft:wp('-8'),

 },
 iconView:{
    width:wp('7%'), 
    height:wp('7%'), 
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:wp('1')
 },
 icon:{
     width:wp('4%'), 
     height:wp('4%'), 
     tintColor:Colors.white
    },
content:{
    height:hp('75%'),
    justifyContent:'flex-start',
    alignItems:'flex-start',
    backgroundColor:Colors.white,


},
menu:{
    marginVertical:hp('1%'),
    color:Colors.primary,
    width:wp('60')
    

},
footer:{
    height:hp('0%'),
    justifyContent:'center',
    paddingBottom:hp('2%'),
    alignItems:'flex-start',
    backgroundColor:Colors.white,


},
radioFooter:{
    flex:0.5,
    flexDirection:'row',
    justifyContent:'space-around',
    marginLeft:wp('2')
},
radio:{
    marginHorizontal:wp('3'),
    color:Colors.primary
}

});
