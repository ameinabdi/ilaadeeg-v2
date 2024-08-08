import React from 'react';
import { ActivityIndicator,Image,Linking,Alert, FlatList,TouchableOpacity, ImageBackground, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './product-detail.screen.style';
import { Card, CardItem, Body, Textarea, Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ProductAction from './product.reducer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Images,Colors } from '../../../shared/themes'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import BusinessItem from '../business/business-item';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import {useTranslation} from 'react-i18next';
import Carousel from 'react-native-snap-carousel';
import {AnimatedImage, RadioGroup,RadioButton } from 'react-native-ui-lib'; //eslint-disable-line
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Share from 'react-native-share';
import Modal from "react-native-modal";
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import Toast from 'react-native-toast-message';

function ProductDetailScreen(props) {
  const { route, getProduct, reporting, reportProduct, account, reportingError,reportingSuccess, navigation, fetching,product, error } = props;
  const { productId } = route.params
  const [indexImage, setIndexImage] = React.useState(0)
  const {t, i18n} = useTranslation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [reportReason, setReportReason] = React.useState(null);
  const [reportComment, setReportComment] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getProduct(productId);
      setIndexImage(0)
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productId, getProduct, setIndexImage]),
  );

  
  useDidUpdateEffect(() => {
    if (!reporting && reportingError) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error,
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }else if(reportingSuccess){
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'sucess',
        text2: "sucessfully Saved",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      handleModal()
      setReportReason(null)
      setReportComment(null)
    }
  }, [reporting]);

  const handleShare = ()=>{
    const options = {
        title:product?.name,
        subject: product?.name,
        url: 'https://preview.ilaadeeg.com/api/product-view/'+product?.id,
        message:  product?.description,
        linkMetadata:{
          originalUrl:'https://preview.ilaadeeg.com/api/product-view/'+product?.id,
          url:'https://preview.ilaadeeg.com/api/product-view/'+product?.id,
          title:product?.name,
          description:product?.description,
          image:product?.gallery[0].downloadUrl,
          icon:product?.gallery[0].downloadUrl,
        }

    }
    Share.open(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
  }

  const handleCallPress = ()=>{
    Alert.alert(
      "Are You Sure ",
      "To Call it ?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Sure", onPress: () => Linking.openURL('tel:'+product?.contact?.telephone) }
      ]
    );
  }

  const handleChatPress = ()=>{
    Alert.alert(
      "Are You Sure ",
      "To Chat it throught whatsapp ?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Sure", onPress: () => Linking.openURL(`https://api.whatsapp.com/send/?phone=${product?.contact?.telephone}&text&type=phone_number&app_absent=0`) }
      ]
    );
  }

  const handleModal = ()=>{
    setIsModalVisible(!isModalVisible)
   }

  const handleReport = ()=>{
    if (reportReason && reportComment) {
      const report = {
        reason:reportReason,
        comment:reportComment,
        product:product.id
      }
      reportProduct(report)
    }else{
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Empty Feilds: Please Make Sure It:',
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
     
    }
   
  }


  if(fetching || !product?.gallery){
    return (
      <LoadingComponent />
    )
  }
  const handleGallery = ()=>{
    if(product?.gallery[0]){
      return (
        <Carousel
        data={product?.gallery}
        currentIndex={indexImage}
        containerCustomStyle={styles.swiperList}
        onSnapToItem={(index)=>setIndexImage(index)}
        renderItem={({item})=>{
          return(
            <TouchableOpacity onPress={()=>props.navigation.navigate('ImageViewer',{images:product?.gallery})}>
            <AnimatedImage 
             loader={<SkeletonPlaceholder>
              <View style={styles.headerContainer}></View>
            </SkeletonPlaceholder>} 
            source={item.downloadUrl ? {uri:item.downloadUrl} : Images.brokenimg}  style={styles.headerContainer}>
             <LinearGradient
              colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.01)']}
              style={styles.header}>
              </LinearGradient>
            </AnimatedImage>
          </TouchableOpacity>
          )
        }}
        sliderWidth={widthPercentageToDP('100')}
        itemWidth={widthPercentageToDP('100')}
        />
      )
    }
      return(
        <Swiper 
      index={indexImage}
      onIndexChanged={(index)=>setIndexImage(index)}
     autoplay={false} style={styles.swiperList}>
            <TouchableOpacity>
            <AnimatedImage 
             loader={<SkeletonPlaceholder>
              <View style={styles.headerContainer}></View>
            </SkeletonPlaceholder>}  source={Images.brokenimg}  style={styles.headerContainer}>
             <LinearGradient
              colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.01)']}
              style={styles.header}>
                <Left>
                  <View style={styles.backbuttonContainer}>
                  <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
                  </View> 
                </Left>
                <Body>
                </Body>
                <Right>
                </Right>
              </LinearGradient>
            </AnimatedImage>
          </TouchableOpacity>
      </Swiper>
      )
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
         <View style={styles.rightHeader}>
          <FeatherIcon name='share-2' color={Colors.white} style={styles.sharebutton} size={20} onPress={handleShare}  />
         </View>
      </Right>
    </View>
    <ScrollView style={styles.content}>
    <View style={styles.wrapper}>
      {handleGallery()}
      <View style={styles.wrapperItems}>
      <View style={styles.wItemView}>
        <Icon name='camera' color={Colors.white} style={styles.backbutton} size={16} />
        <Text style={styles.wItemText}>{product?.gallery.length}</Text>
      </View>
      <View style={styles.wItemView}>
        <Icon name='enviroment' color={Colors.white} style={styles.backbutton} size={16} />
        <Text style={styles.wItemText}>{product?.address}</Text>
      </View>
      <View style={styles.wItemView}>
        <Icon name='calendar' color={Colors.white} style={styles.backbutton} size={16} />
        <Text style={styles.wItemText}> {moment(product.createdAt).fromNow()}</Text>
      </View>
      
      </View>
      </View>
        <View style={styles.subHeader}>
        <View style={styles.productHeaderView}>
        <View >
          <Text style={styles.productName}>{product.title}</Text>     
          </View>
          <View style={styles.footerprice}>
            <Text style={styles.footerprice}>{'$ '+product.price}</Text>
          </View>
          <View>
          {account?.id  && (
          <Button style={styles.callButton} transparent block onPress={handleCallPress}>
            <Icon name='phone' color={Colors.white}  size={20} />
            <Text style={styles.callButtonText}>Call</Text>
        </Button>
         )}
        {account?.id  && (
          <Button style={styles.callButton} transparent block onPress={handleChatPress}>
            <Icon name='mail' color={Colors.white}  size={20} />
            <Text style={styles.callButtonText}>Chat Whatsapp</Text>
        </Button>
        )}
        </View>
        </View>
        <View style={styles.productDescView}>
          <Text style={styles.productDescription}>{t('screen.product.description')}</Text>
          <Text style={styles.productDescriptionText}>{product.description}</Text>
        </View>
        <View style={styles.productDescView}>
          <Text style={styles.productDescription}>{t('screen.product.address')}</Text>
          <Text style={styles.productDescriptionText}>{product.address}</Text>
        </View>
        </View>
        {account?.id  && (<BusinessItem business={product} navigation={props.navigation} />)}
        <Button style={styles.buttonReport} transparent onPress={handleModal} >
          <Icon name='flag' color={Colors.bloodOrange} size={20} />
           <Text style={styles.buttonReportText}>Report Abuse</Text>
        </Button> 
      </ScrollView>
        
        <Modal isVisible={isModalVisible} style={styles.model}>
         <View style={styles.modelContainer}>
          <View  style={styles.modelheader}>
          <Left>
              </Left>
              <Body>
                <Text style={styles.modelTitle}>Report !</Text>
              </Body>
              <Right>
              <Icon name="close" color={Colors.charcoal} style={styles.closebutton} size={20}  onPress={()=>handleModal()}/>
              </Right>
          </View>
          { reporting ?
          <View style={styles.modalContent}>
          <LoadingComponent />
          </View>
          :
          <View style={styles.modalContent}>
          <View style={styles.row}>
                  <Text style={styles.rowLabel}>Reasons</Text>
          <RadioGroup style={styles.selection} initialValue={reportReason} onValueChange={(value) => setReportReason(value)}>
            {product?.reasonReport?.map((reason, index)=>{
              return(
                <RadioButton key={index} color={Colors.primary} style={styles.selector} value={reason.title} label={reason.title}/>
              )
            })}
          </RadioGroup>
          </View>
          <View style={styles.row}>
                  <Text style={styles.rowLabel}>Comment Your Reason</Text>
                  <View style={styles.input}>
                  <Textarea
                    testID="loginScreenUsername"
                    rowSpan={5}
                    style={[styles.textInput,{paddingLeft:0,height:80}]}
                    value={reportComment}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setReportComment(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Your Comment"
                  />
              </View>
           </View>
           <Button style={styles.buttonSave} transparent onPress={handleReport} >
            <Text style={styles.buttonSaveText}>Send</Text>
          </Button>
          </View> }


         </View>
        </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    product: state.products.product,
    error: state.products.errorOne,
    fetching: state.products.fetchingOne,
    deleting: state.products.deleting,
    errorDeleting: state.products.errorDeleting,
    reportingError: state.products.errorReporting,
    reporting:state.products.reporting,
    reportingSuccess: state.products.reportingSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(ProductAction.productRequest(id)),
    reportProduct: (report) => dispatch(ProductAction.reportRequest(report)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);
