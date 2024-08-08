import { StyleSheet } from 'react-native';

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container:{
        flex:1
    },
    list:{
        flex:1,
    alignItems:'flex-start',
    justifyContent:'flex-start'
    },
    picker:{
        width:wp('22'),
        height:wp('28'),
        marginTop:wp('4'),
        marginHorizontal:wp('1'),
    },
    pickerView:{
        marginTop:wp('4'),
        marginHorizontal:wp('1'),
        width:wp('20'),
        height:wp('20'),
        borderRadius:wp('1'),
        borderWidth:2,
        borderColor:Colors.primary,
        borderStyle:'dashed',
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        width:wp('7'), 
        height:wp('7'),
        tintColor:Colors.primary
    
    },
    image:{
        width:wp('20'),
        height:wp('20'),
        resizeMode:"cover",
        borderRadius:wp('1'),
        borderWidth:2,
        borderColor:Colors.primary,
        borderStyle:'dashed',
    },
 
});
