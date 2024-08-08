import { Platform } from 'react-native';
import { Colors } from './index'
const platformFont = Platform.select({ android: 'Roboto', default: 'Avenir-Book' });

const type = {
  base: platformFont,
  bold: platformFont,
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
    color:Colors.title
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
    color:Colors.title
  },
  h3: {
    fontSize: size.h3,
    color:Colors.title
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    color:Colors.title
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
    color:Colors.title
  },
  h6: {
    fontSize: size.h6,
    color:Colors.title
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    color:Colors.title
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    color:Colors.title
  },
};

export default {
  type,
  size,
  style,
};
