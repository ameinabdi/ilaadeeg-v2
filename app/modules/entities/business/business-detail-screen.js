import React from 'react';
import { ActivityIndicator,Image,Platform, ImageBackground,Linking, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Images,Colors } from '../../../shared/themes'
import styles from './business-detail.screen.style';
import { Card, CardItem, Body,  Form,Button,Tab, Tabs, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import BusinessAction from './business.reducer';
import Icon from 'react-native-vector-icons/AntDesign'
import TextAvatar from 'react-native-text-avatar';
import ProductComponent from '../../home/product.component';
import FeedbackComponent from '../feedback/feedback-Component';
import {useTranslation} from 'react-i18next';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import _ from 'lodash';

function BusinessDetailScreen(props) {
  const { route, getBusiness,business, navigation, fetching, error } = props;
  const { businessDetail } = route.params
  const {t, i18n} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      getBusiness(businessDetail?.id);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [businessDetail, getBusiness]),
  );
  if(!business || fetching){
    return (
      <LoadingComponent navigation={props.navigation} />
    )
  }

  let grouped = _.chain(business?.products)
  // Group the elements of Array based on `productName` property
  .groupBy('product.categoryId')
  // `key` is group's name (product Name), `value` is the array of objects
  .map((value, key) => ({ category: value[0]?.category, products: value }))
  .value();

  const url = Platform.select({
    ios: `maps:0,0?q=${business?.mapLink}`,
    android: `geo:0,0?q=${business?.mapLink}`,
  })
  return (
    <Container style={styles.container}>
        <ImageBackground source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3BWf14vGWo_f-iZJBPURa14FDUtZhOFrVgw&usqp=CAU'}}  style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.goBack()}/>
            </Left>
            <Body />
            <Right/>
        </ImageBackground>
        <View style={styles.profile}>
          <View style={styles.profileImage}>
          <TextAvatar
           backgroundColor={Colors.secondary}
           size={110}
           type={'square'} // optional
          >{business.name ? business.name : 'IL'}</TextAvatar>
           <Text style={styles.fullname} >{business?.name}</Text>
          </View>
          <View style={styles.actionView}>
            <Button style={styles.actionButton}>
              <Icon name='enviroment' size={22} color={Colors.primary} onPress={() => Linking.openURL(business?.mapLink ? business?.mapLink : '')} />
              <Text style={styles.actionButtonText}>{t('screen.business.map')} </Text>
            </Button>
            <Button style={styles.actionButton} onPress={()=>{Linking.openURL(`tel:`+business?.telephone)}} >
              <Icon name='phone' size={22} color={Colors.primary} />
              <Text style={styles.actionButtonText}>{t('screen.business.call')}</Text>
            </Button>
          </View>
          </View>
          <Tabs>
          <Tab heading={t('screen.business.products')} textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
          <Content style={styles.content}>
          {grouped.map((item)=>{
            return (
              <View style={styles.productContent}>
                <View style={styles.productHeader}>
                  <Text style={styles.productTitle}>
                    {item.category?.categoryName}
                  </Text>
                  <Text style={styles.productView}  onPress={()=>props.navigation.navigate('ProductCategory', { category: item?.category })}>
                  {t('screen.home.viewall')}
                  </Text>
                </View>
                <ProductComponent products={item?.products} navigation={props.navigation} />
              </View>
            )
          })}
          </Content>
          </Tab>
          <Tab heading={t('screen.business.review')} textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
            <FeedbackComponent tenantId={business?.id} />
          </Tab>
          </Tabs>
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    business: state.business.business,
    error: state.business.errorOne,
    fetching: state.business.fetchingOne,
    deleting: state.business.deleting,
    errorDeleting: state.business.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBusiness: (id) => dispatch(BusinessAction.businessRequest(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetailScreen);
