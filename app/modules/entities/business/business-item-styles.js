import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes';

export default StyleSheet.create({

    card:{
        marginVertical:hp('3'),
        width:wp('100'),
        flexDirection:'row',
        height:hp('15'),
        paddingVertical:hp('2'),
        backgroundColor:Colors.white
      },
      center:{
        width:wp('65'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:wp('2')
      },
      contactcenter:{
        flex:1,
        paddingHorizontal:wp('2'),
      },
      leftItem:{
        width:wp('20'),
        justifyContent:'center'
      },
      titleName:{
        fontSize:wp('4'),
        color:Colors.title,
        fontWeight:'bold'
      },
      title:{
        fontSize:16,
        marginTop:hp('1.5'),
        color:Colors.title,
      },
      text:{
        fontSize:14,
        color:Colors.white,
        fontWeight:'bold'
      },
      row:{
        flexDirection:'column',
        justifyContent:'space-between', 
      },
      rightCol:{
        marginLeft:wp('2')
      },
      right:{
        width:wp('0'),
        flexDirection:'row'
      },
      badge:{
        marginTop:hp('0.5'),
        padding:wp('2'),
        backgroundColor:Colors.secondary,
        borderRadius:wp('1')
      }
});
