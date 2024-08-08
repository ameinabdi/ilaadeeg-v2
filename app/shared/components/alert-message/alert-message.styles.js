import { StyleSheet } from 'react-native';

import { Colors, Metrics, Fonts } from '../../themes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginVertical: Metrics.section,
    paddingVertical:hp('10'),
    height:hp('100')
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.text,
  },
  icon: {
    color: Colors.black,
  },
  animation:{
    width:200,
    height:200
}
});
