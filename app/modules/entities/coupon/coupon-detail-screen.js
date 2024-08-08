import React from 'react';
import { ActivityIndicator,Linking, Image,FlatList,TouchableOpacity, ImageBackground, ScrollView, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './coupon-detail-screen.style';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Images,Colors } from '../../../shared/themes'
import {useTranslation} from 'react-i18next';

function CouponDetailScreen(props) {
  const { route, g  } = props;
  const { coupon } = route.params
  const [indexImage, setIndexImage] = React.useState(0)
  const {t, i18n} = useTranslation();

  
  if(!coupon?.image){
    return (
      <Container style={styles.container} testID="productDetailScrollView">
      <View style={styles.header}>
                  <Left>
                    <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
                  </Left>
                  <Body>
                  </Body>
                  <Right>
                  </Right>
        </View>
        <View style={styles.wrapper}>
              <ImageBackground source={Images.brokenimg}  style={styles.headerContainer} />
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.subHeader}>
          <Text style={styles.productName}>{coupon.code}</Text>
          <Text style={styles.productDescription}> {t('screen.coupon.description')}</Text>
          <Text style={styles.productDescriptionText}>{coupon.description}</Text>
          <Text style={styles.productDescription}> {t('screen.coupon.link')}</Text>
          <Text style={styles.productDescriptionText}>{coupon.link}</Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
  return (
    <Container style={styles.container} testID="productDetailScrollView">
    <View style={styles.header}>
                <Left>
                  <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.goBack()}/>
                </Left>
                <Body>
                </Body>
                <Right>
                </Right>
      </View>
      <View style={styles.wrapper}>
     
     <TouchableOpacity onPress={()=>props.navigation.navigate('ImageViewer',{images: coupon?.image })}>
            <ImageBackground source={coupon?.image[0]?.downloadUrl ? {uri:coupon?.image[0]?.downloadUrl} : Images.brokenimg}  style={styles.headerContainer} />
    </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.subHeader}>
        <Text style={styles.productName}>{coupon.code}</Text>
        <Text style={styles.productDescription}>{t('screen.coupon.description')}</Text>
        <Text style={styles.productDescriptionText}>{coupon.description}</Text>
        <Text style={styles.productDescription}> {t('screen.coupon.link')}</Text>
        <Text style={styles.productDescriptionText} onPress={()=> Linking.openURL(coupon.link)}> Click Here</Text>
        </View>
      </ScrollView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
 

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponDetailScreen);
