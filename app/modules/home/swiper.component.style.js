import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes';

export default StyleSheet.create({
  content: {
    backgroundColor:Colors.white,
    height:hp('28'),
  },
  wrapper: {
    height:hp('28'),
    marginVertical:10,

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
});
