import React from 'react';
import { ScrollView,FlatList,TouchableOpacity, Platform,ActivityIndicator, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Images } from '../../shared/themes';
import {View,  Text,} from 'react-native-ui-lib';
import _ from 'lodash';
import styles from './product.component.style';
import AlertMessage from '../../shared/components/alert-message/alert-message.js';
import OrderAction from '../entities/order/order.reducer'
import {AnimatedImage} from 'react-native-ui-lib'; //eslint-disable-line
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function ProductComponent(props) {
 const { products , customerOrderSave} = props;


 const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { productId: item.id })}>
        <View style={styles.card}>
        <View style={styles.imageBg}>
        <AnimatedImage 
        loader={<SkeletonPlaceholder>
          <View style={styles.image}></View>
        </SkeletonPlaceholder>} 
        defaultSource={Images.brokenimg}
        source={item?.gallery[0]?.downloadUrl ? {uri:item.gallery[0]?.downloadUrl} : Images.brokenimg}  style={styles.image}/>
        </View>
        <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
        <View style={styles.row}>
          <View style={styles.left}>
          <Text style={styles.productPrice} numberOfLines={1}>{'$ '+item.price}</Text>
          </View>
           {/*
          <View style={styles.right}>
             <Image source={Images.star} style={styles.ratingIcon} />
             <Text  style={styles.ratingNumber}>{item.rate} 4.5</Text> 
          </View>
          */}
        </View>
        </View>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item, index) => `${index}`;
  const renderEmpty = () => <AlertMessage title="No Bookings Found" show={!products} />;

  return (
    <View style={styles.content}>
     <FlatList
        contentContainerStyle={styles.listContent}
        data={products}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
        numColumns={3}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({ 
    account: state.account.account,
   

});
const mapDispatchToProps = (dispatch) => ({
  customerOrderSave: (order) => dispatch(OrderAction.customerOrderSave(order)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
