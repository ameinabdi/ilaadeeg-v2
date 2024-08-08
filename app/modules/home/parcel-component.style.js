import { StyleSheet,Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes';

export default StyleSheet.create({
  content: {
    flexGrow:1,
    padding:wp('3%'),
    justifyContent:'flex-start',
  },
  wrapper:{
    flex:1,
  },
  autocomplete:{
      backgroundColor:Colors.white,
      width:wp('90%'),
      height:hp('30%')
  },
  row:{
      width:wp('94%'),
      backgroundColor:Colors.background,
      height:hp('6%'),
      justifyContent:'flex-start',
      paddingTop:Platform.OS == "android" ? wp('0%') :wp('4%'),
      paddingHorizontal:wp('3%'),
      borderRadius:wp('1%')
  },
  textInput:{
      flexDirection:'row',
      width:wp('80%')

  },
  inputDate:{
    flex:1,

},
  selectIcon:{
      width:wp('10%'),
      height:wp('10%'),
      borderRadius:wp('100%'),
      resizeMode: 'cover', 
      backgroundColor:'red'
    },
    selectTitle:{
        fontSize:wp('4%'),
        color:Colors.title,
        margin:wp('3%')
    },
    list:{
        justifyContent:'flex-start',
        height: hp('10'),
        borderBottomWidth: 1,
        borderColor: Colors.background,
        alignSelf:'flex-start',
        padding:wp('2%')
      },
      button:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:1,
        width: wp('94%'),
        height:hp('6%'),
        marginTop: hp('5'),
        backgroundColor:Colors.primary,
        color: Colors.primary,
        borderRadius:wp('1')
       },
       buttonText: {
        color: Colors.white,
        fontSize: 16,
      },
});
