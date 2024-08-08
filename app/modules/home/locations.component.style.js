import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes';

export default StyleSheet.create({
  content: {
    flex:1,
    backgroundColor:Colors.white
  },
  autocomplete:{
      backgroundColor:Colors.white,
      width:wp('90%'),
      height:hp('30%')
  },
  title:{
    fontWeight:'500',
    color:Colors.text,
    marginVertical:hp('1.4%')
  },
  row:{
      backgroundColor:Colors.background,
      height:hp('6.4%'),
      justifyContent:'center',
      paddingHorizontal:wp('3%'),
      borderRadius:wp('1%')
  },
  input:{
      flexDirection:'row',
      width:wp('80%')

  },
  rowInput:{
    backgroundColor:Colors.background,
    height:hp('6.4%'),
    alignItems:'flex-start',
    alignContent:'flex-start',
    justifyContent:'center',
    paddingHorizontal:wp('3%'),
    borderRadius:wp('1%')
},
  inputDate:{
    marginTop:wp('0.5%'),
    color:Colors.text,
    fontSize:wp('4%'),
    fontWeight:'500',
    width:wp('30%'),

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
        width:wp('100%'),
        height: hp('14%'),
        borderBottomWidth: 1,
        borderColor: Colors.background,
        alignItems:'flex-start',
        padding:wp('2%')
      },
      button:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:1,
        width: wp('90%'),
        height:hp('7%'),
        marginTop: hp('3%'),
        backgroundColor:Colors.primary,
        color: Colors.primary,
        borderRadius:wp('1%')
       },
       buttonText: {
        color: Colors.white,
        fontSize: 18,
      },
});
