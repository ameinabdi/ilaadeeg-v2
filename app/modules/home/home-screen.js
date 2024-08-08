import React,{useEffect} from 'react';
import { ScrollView,BackHandler,Alert, TextInput, Text,StyleSheet,StatusBar, View,Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Animation, Colors, Images } from '../../shared/themes';
import styles from './home-screen.styles';
import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';
import HomeActions from './home-reducer'
import {  Button, Container, Content, Left,Header,Body,Right, Tab, Tabs, Row,Col } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import {  Picker,  DateTimePicker, Avatar} from 'react-native-ui-lib';
import _ from 'lodash';
import VersionCheck from 'react-native-version-check';
import HomeSkeletonScreen from '../../shared/components/home-skeleton-loading/skeleton-loadin-component';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { checkVersion } from "react-native-check-version";
import DeviceInfo from 'react-native-device-info';
import '../../../i18n';
import {useTranslation} from 'react-i18next';
import SwiperComponent from './swiper.component';
import CategoryComponent from './category.component';
import ProductComponent from './product.component';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';


function HomeScreen(props) {
  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);
  const [sendAmount, setSendAmount] = React.useState(0);
  const [receiveAmount, setReceiveAmount] = React.useState(0);
  const {t, i18n} = useTranslation();

  const { navigation,getProduct, updating,updatingError,versionError, getVersion,versionFetching,version, transaction,reset, account,createTransaction, fetching,services,fetchingproduct, product, error, locations, getService } = props;
  // if the user is already logged in, send them home
 
 
  useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
        return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
);
useFocusEffect(
  React.useCallback(() => {
    getService();
    getProduct();
    getVersion();
    
    // checkUpdateNeeded()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [navigation,getVersion, getProduct, getService]),
);
 

useDidUpdateEffect(() => {
  if (!versionFetching) {
    if(versionError){
      
    }else if(version){
      if(version.version >= DeviceInfo.getVersion() && version.priority === "Low" || version.priority === "Normal"){
      Toast.show({
        type: 'info',
        position: 'top',
        text1: version.title,
        text2: version.description,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 50,
      });
    }
      if(version.version >= DeviceInfo.getVersion() && version.priority === "High"){
        navigation.navigate('UpdateChecker')
      }
    }
   
  }
}, [versionFetching,versionError, version]);


if(fetching || updating){
  return (
    <ModelLoadingComponent />
  )
}
 
  return (
    <Container style={styles.container}>
     <Header style={styles.header} translucent transparent>
       <Left>
        {account ?
        <Button style={styles.menubutton} transparent onPress={()=>navigation.openDrawer()}>
        <Image source={Images.menu} style={styles.menuIcon} />
      </Button>
      :<Button style={styles.menubutton} transparent onPress={()=>navigation.navigate('Intro')}>
      <Image source={Images.left} style={styles.menuIcon} />
    </Button>
         }
        
       </Left>
       <Body>
       <Image source={Images.header} style={styles.headerIcon} />
       </Body>
       <Right>
       {account ?
       <Button style={styles.resellbutton} transparent onPress={()=>navigation.navigate('ProductEditScreen')}>
          <Icon name="plus" size={15} color={Colors.primary} />
          <Text style={styles.resellbuttonText}> {t('screen.home.post')} </Text>
        </Button>
        :
        <Button style={styles.resellbutton} transparent onPress={()=>navigation.navigate('Login')}>
        <Icon name="plus" size={15} color={Colors.primary} />
        <Text style={styles.resellbuttonText}> {t('screen.home.post')} </Text>
      </Button>
        }
       </Right>
     </Header>
     <Content style={styles.content}>
      <SwiperComponent coupons={services?.coupons} navigation={props.navigation}/>
      <CategoryComponent categories={services?.categories} navigation={props.navigation} />
      {/* {product?.map((item)=>{
        return (
          <View style={styles.productContent}>
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>
                {item.categoryName}
              </Text>
              <Text style={styles.productView} onPress={()=>props.navigation.navigate('ProductCategory', { category: item.category,  subcategory: item })}>
              {t('screen.home.viewall')} 
              </Text>
            </View>
            <ProductComponent products={item?.products} navigation={props.navigation} />
          </View>
        )
      })} */}
     </Content>
  </Container>
  );
}

const mapStateToProps = (state) => ({ 
  account: state.account.account,
  error: state.home.errorServices,
  fetching: state.home.fetchingServices,
  services: state.home.services,
  updating: state.home.updating,
  updatingError: state.home.updatingError,
  transaction: state.home.transaction,

  version:  state.home.version,
  versionError:  state.home.versionError,
  versionFetching:  state.home.versionFetching,


  errorproduct: state.home.errorproduct,
  fetchingproduct: state.home.fetchingproduct,
  product: state.home.product,

});
const mapDispatchToProps = (dispatch) => ({
  getService: () => dispatch(HomeActions.serviceRequest()),
  getVersion: () => dispatch(HomeActions.versionRequest()),

  createTransaction: (transaction) => dispatch(HomeActions.createTransactionRequest(transaction)),
  getProduct: (transaction) => dispatch(HomeActions.homeProductRequest(transaction)),
  reset: () => dispatch(HomeActions.reset()),

});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
