import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './search-bar.styles';
import { Colors, Metrics } from '../../themes';
import {useTranslation} from 'react-i18next';

export default function SearchBar(props) {
  // static propTypes = {
  //   onSearch: PropTypes.func.isRequired,
  //   onCancel: PropTypes.func.isRequired,
  //   searchTerm: PropTypes.string,
  // };
  const { onSearch, onCancel, searchTerm } = props;
  const {t, i18n} = useTranslation();

  const dimensions = useWindowDimensions();
  return (
    <View style={[styles.container]}>
      <Ionicons name="md-search" size={Metrics.icons.small} style={styles.searchIcon} />
      <TextInput
        placeholder={t('screen.search.searchbar')} 
        placeholderTextColor={Colors.text}
        underlineColorAndroid="transparent"
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={onSearch}
        autoCapitalize="none"
        onSubmitEditing={onSearch.bind(this, searchTerm)}
        returnKeyType={'search'}
        autoCorrect={false}
        selectionColor={Colors.text}
        testID="searchTextInput"
      />
    </View>
  );
}
