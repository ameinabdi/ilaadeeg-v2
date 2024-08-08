import { StyleSheet } from 'react-native';

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.black,
      },
      headerContainer:{
        width:wp('100'),
        height:hp('40'),
        backgroundColor:Colors.white
    
      },
      header:{
        paddingHorizontal:wp('2'),
        paddingTop:hp('10'),
        height:hp('10'),
        flexDirection:'row',
        backgroundColor:Colors.black
      },
      headerMenu:{
       flexDirection:'column',
       justifyContent:'flex-start',
       alignItems:'flex-start',
       backgroundColor:'rgba(52, 52, 52, 0.8)'  
      },
      haederTitle:{
        fontSize:wp('4'),
        color:Colors.white
      },
      content:{
        flex:1,
      },
      backbutton:{
        width:wp('20'),
        height:wp('18'),
      },
      image:{
        width:wp('100'),
        height:hp('100')
      }
 
});
