import React from 'react';
import { ActivityIndicator,Image,FlatList,TouchableOpacity, ImageBackground, ScrollView, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './product-view.screen.style';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ProductAction from './product.reducer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Images,Colors } from '../../../shared/themes'
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import Carousel from 'react-native-snap-carousel';

function ProductViewScreen(props) {
  const { route, getProduct, navigation, fetching,product, error,soldProduct } = props;
  const { productItem } = route.params
  const [indexImage, setIndexImage] = React.useState(0)
  const {t, i18n} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      getProduct(productItem.id);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productItem, getProduct]),
  );


  const handleDeletePost = (dataProduct)=>{
    Alert.alert(
      "Deleted ",
      "Are You Sure To Delete",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sure",
          style: "ok",
          onPress:()=>{
            props.deleteProduct(dataProduct.id)
            navigation.goBack() 
          }
        },
      ],
    );
    }

    const hanndleSoldProduct = (dataobj)=>{
      Alert.alert(
        "Change Status ",
        "Are You Sure To Change This Product's Status",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sure",
            style: "ok",
            onPress:()=>{
              soldProduct(dataobj)
            }
          },
        ],
      );
      }
  if(fetching || !product?.gallery){
    return (
      <LoadingComponent />
    )
  }
  
  if(!product.payment){
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: "You Did not Pay Post Feee",
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 150,
    });
  }
  
  return (
    <Container style={styles.container} testID="productDetailScrollView">
    <View style={styles.header}>
                <Left>
                  <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
                </Left>
                <Body>
                </Body>
                <Right>
                  <Icon name="edit" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('PostEditScreen',{productData:product})}/>
                </Right>
      </View>
      <View style={styles.wrapper}>
      <Carousel
              ref={(c) => { this._carousel = c; }}
              data={product?.gallery}
              containerCustomStyle={styles.swiperList}
              onSnapToItem={(index)=>setIndexImage(index)}
              renderItem={({item})=>{
                return(
                  <TouchableOpacity  onPress={()=>props.navigation.navigate('ImageViewer',{images:product?.gallery})}>
                  <ImageBackground source={item.downloadUrl ? {uri:item.downloadUrl} : Images.brokenimg}  style={styles.headerContainer}>
                   
                  </ImageBackground>
                </TouchableOpacity>
                )
              }}
              sliderWidth={widthPercentageToDP('100')}
              itemWidth={widthPercentageToDP('100')}
      />
      <View style={styles.listContent}>
      <FlatList
        data={product?.gallery}
        horizontal
        renderItem={({item, index})=>{
          if(index == indexImage){
            return (
              <TouchableOpacity style={styles.ContainerimageSlider}  onPress={()=>props.navigation.navigate('ImageViewer',{images:product?.gallery})}>
                <Image source={item.downloadUrl ? {uri:item.downloadUrl} : Images.brokenimg} style={styles.SelectedimageSlider} />
              </TouchableOpacity>
            )
          }else{
            return (
              <TouchableOpacity style={styles.ContainerimageSlider}  onPress={()=>props.navigation.navigate('ImageViewer',{images:product?.gallery})}>
                <Image source={item.downloadUrl ? {uri:item.downloadUrl} : Images.brokenimg} style={styles.imageSlider} />
              </TouchableOpacity>
            )
          }
         
        }}
        extraData={
          indexImage
        }
        contentContainerStyle={styles.listContent}
        keyExtractor={(data)=>data.id}
      />
      </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.subHeader}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productDescription}>{t('screen.product.description')}</Text>
        <Text style={styles.productDescriptionText}>{product.description}</Text>
        <Text style={styles.productDescription}>{t('screen.product.productType')}</Text>
        <Text style={styles.productDescriptionText}>{product.status}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
      <Button style={styles.buttonTrash} transparent onPress={()=> handleDeletePost(product)} >
         <Icon name='delete' color={Colors.white} size={20} />
         <Text style={styles.buttonTrashText}>{t('screen.product.deletePost')} </Text>
       </Button>
       {!product.payment ?
       <Button style={styles.buttonCart} transparent onPress={()=>props.navigation.navigate('PaymentCheckOutScreen',{product:product})}>
         <Icon name='plus' color={Colors.white} size={20} />
         <Text style={styles.buttonCartText}>{t('screen.product.payPostFee')} </Text>
       </Button>
       :null}
      {product?.status === "Sold" ?
        <Button style={[styles.buttonCart,{backgroundColor:Colors.primary}]} transparent onPress={()=>hanndleSoldProduct({id:product.id, status:"Publish"})}>
          <Icon name='check' color={Colors.white} size={20} />
          <Text style={styles.buttonCartText}>{t('screen.product.publish')} </Text>
       </Button>
       :
       <Button style={styles.buttonCart} transparent onPress={()=>hanndleSoldProduct({id:product.id, status:"Sold"})}>
         <Icon name='creditcard' color={Colors.white} size={20} />
         <Text style={styles.buttonCartText}>{t('screen.product.sold')} </Text>
       </Button>
       }
      
       
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.products.product,
    error: state.products.errorOne,
    fetching: state.products.fetchingOne,
    deleting: state.products.deleting,
    errorDeleting: state.products.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(ProductAction.productRequest(id)),
    deleteProduct: (id) => dispatch(ProductAction.productDeleteRequest(id)),
    soldProduct: (product) => dispatch(ProductAction.productSoldRequest(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewScreen);
