import React from 'react';
import { ScrollView,View, FlatList,Image,TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LearnMoreLinks from './learn-more-links.component.js';
import { Colors, Images } from '../../shared/themes';
import { Dialog, Text, Picker, Avatar, Assets, PanningProvider, Typography} from 'react-native-ui-lib';
import _ from 'lodash';
import styles from './category.component.style';
import AlertMessage from '../../shared/components/alert-message/alert-message.js';
import {AnimatedImage} from 'react-native-ui-lib'; //eslint-disable-line
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


function CategoryComponent(props) {
 const { categories } = props;

 const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductCategory', { category: item })}>
        <View style={styles.card}>
        <View style={styles.imageBg}>
        <AnimatedImage 
        loader={<SkeletonPlaceholder>
          <View style={styles.image}></View>
        </SkeletonPlaceholder>} 
        defaultSource={Images.brokenimg}
        source={item.thumnail[0]?.downloadUrl ? {uri:item.thumnail[0]?.downloadUrl}: Images.brokenimg}  style={styles.image}/>
        </View>
        <Text style={styles.text} numberOfLines={1}>{item.categoryName}</Text>
        <Text style={styles.count} numberOfLines={1}>{item.productTotal} Items</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const keyExtractor = (item, index) => `${index}`;
  const renderEmpty = () => <AlertMessage title="No Bookings Found" show={!categories} />;
  return (
    <View style={styles.content}>
     <FlatList
        contentContainerStyle={styles.listContent}
        data={categories}
        renderItem={renderRow}
        numColumns={3}
        // horizontal
        // showsHorizontalScrollIndicator={false}
        // legacyImplementation={false}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({ 
    account: state.account.account,
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
