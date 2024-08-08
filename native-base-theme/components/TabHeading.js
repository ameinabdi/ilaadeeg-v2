// @flow

import variable from './../variables/platform';
import { PLATFORM } from './../variables/commonColor';

export default (variables /* : * */ = variable) => {
  const platform = variables.platform;

  const tabHeadingTheme = {
    flexDirection: 'row',
    backgroundColor: variables.tabDefaultBg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '.scrollable': {
      paddingHorizontal: 20,
      flex: platform === PLATFORM.ANDROID ? 0 : 1,
      minWidth: platform === PLATFORM.ANDROID ? undefined : 60
    },
    'NativeBase.Text': {
      color: 'white',
      marginHorizontal: 7
    },
    'NativeBase.Icon': {
      color:'white',
      fontSize: platform === PLATFORM.IOS ? 26 : undefined
    },
    '.active': {
      'NativeBase.Text': {
        color: 'white',
        fontWeight: '600'
      },
      'NativeBase.Icon': {
        color: variables.topTabBarActiveTextColor
      }
    }
  };

  return tabHeadingTheme;
};
