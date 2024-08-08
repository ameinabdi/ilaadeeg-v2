import { StyleSheet } from 'react-native';

import { Fonts, Colors, Metrics } from '../../themes';

export default StyleSheet.create({
  container: {
    marginTop: Metrics.smallMargin,
    flexDirection: 'row',
    flex:1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor:Colors.background
  },
  searchInput: {
    flex: 1,
    height: 40,
    alignSelf: 'center',
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.instructions,
    paddingLeft: 20,
    color: Colors.title,
    flexDirection: 'row',
  },
  searchIcon: {
    left: Metrics.baseMargin,
    alignSelf: 'center',
    color: Colors.text,
  },
  cancelButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin,
  },
  buttonLabel: {
    color: Colors.black,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
  },
});
