import React,{useEffect} from 'react'
import { ActivityIndicator, Alert,Image, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import ProductActions from '../product/product.reducer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors, Images } from '../../../shared/themes'
import { Form, Item,Button,Content, Textarea, Container,Header, Left, Body, Right } from 'native-base';
import { Col, Row } from "react-native-easy-grid";
// import DateTimePicker from '@react-native-community/datetimepicker';
import MenuIcon from 'react-native-vector-icons/AntDesign';
import {  Picker,  DateTimePicker} from 'react-native-ui-lib';
import styles from './post-edit-styles'
import Stepper from 'react-native-stepper-ui';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import ImageUploader from '../product/image-uploader'
import CheckoutScreen from '../Payment/checkout-screen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import {useTranslation} from 'react-i18next';


function PostEditScreen(props) {
  const { data, updating,isNewEntity,productSetup,
    fetchingProductSetup,
    errorProductSetup,gallery,setGallery, route, getProductSetup,galleryReset, error,product,reset,getProduct,account,updateProduct,fetching,navigation } = props
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [currency, setCurrency] = React.useState(null);
  const [subcategory, setSubCategory] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [active, setActive] = React.useState(0);
  const [contactName, setContactName] = React.useState(null);
  const [contactEmail, setContactEmail] = React.useState(null);
  const [contactPhone, setContactPhone] = React.useState(null);
  const {t, i18n} = useTranslation();

  const { productData } = route.params
  React.useEffect(() => {
    getProductSetup();
    galleryReset()
    if (productData) {
      setTitle(productData?.title)
      setDescription(productData?.description)
      setAddress(productData?.address)
      setCategory({label:productData?.category?.category?.categoryName, value:productData?.category?.category?.id})
      setSubCategory({label:productData?.category?.categoryName, value:productData?.category?.id})
      setCurrency({label:productData?.currency, value:productData?.currency})
      setPrice(productData?.price)
      setContactName(productData?.contact?.name),
      setContactEmail(productData?.contact?.email),
      setContactPhone(productData?.contact?.telephone)
      setGallery(productData?.gallery)

    } 
   

  }, [getProductSetup,galleryReset,productData]);
  

  const resetState =()=>{
    setTitle(null)
    setDescription(null)
    setAddress(null)
    setCategory(null)
    setSubCategory(null)
    setCurrency(null)
    setPrice(null)
    galleryReset()
  }
  
    useDidUpdateEffect(() => {
      if (!updating && error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: error,
          visibilityTime: 8000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }else{
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'sucess',
          text2: "sucessfully Saved",
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        resetState()
        props.navigation.navigate('ProductViewScreen',{ productItem: product })
      }
    }, [updating]);


  const submitForm = () => {
    if (title &&  description && 
       category &&  subcategory &&  
      currency &&  price &&  contactName && contactEmail && 
      contactPhone && address ) {
        const object = {
          'id':productData?.id,
          'title':title,
          'description':description,
          'category':category?.value,
          'subcategory':subcategory?.value,
          'currency':currency?.value,
          'price':price,
          'contactName':contactName,
          'contactEmail':contactEmail,
          'contactPhone':contactPhone, 
          'address':address,
          'gallery':gallery,
          'tenentId':  null
        }
      // if validation fails, value will be null
     updateProduct(object)
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Feild Is Empty! Please Make Sure',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
   }
  }
 
  const handleNextScreen = ()=>{
    if(active == 0 && title &&  description && 
      category &&  subcategory &&  
     currency &&  price ) {
      setActive(active + 1)
     }else if(active == 1 && address){
      setActive(active + 1)
     }
     else{
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Feild Is Empty! Please Make Sure Fill It',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
     }

  }

    if (fetchingProductSetup || !productSetup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    const subcategoryList = productSetup?.categories.find((item,index)=> item.id === category?.value ? item.productCategory : null)
    
    return (
      <Container style={styles.container}>
        <Header style={styles.header} hasTabs>
           <Left>
            <MenuIcon name="left" size={25} color={Colors.white} onPress={()=>props.navigation.navigate('Home')} />
          </Left>
          <Body>
          <Text style={styles.title}>
          {t('screen.product.editTitle')} 
          </Text>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content style={styles.content}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} testID="productEditScrollView">
            <Stepper
            active={active}
            stepStyle={styles.steps}
            stepTextStyle={styles.stepText}
            content={[
              <View style={styles.form}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{t('screen.product.editTitle')} </Text>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>{t('screen.product.title')}</Text>
                  <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={title}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setTitle(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Item Name"
                  />
                  </View>
                </View>
                <Form style={styles.row}>
                  <Text style={styles.rowLabel}>{t('screen.product.description')}</Text>
                  <View style={styles.input}>
                  <Textarea
                    testID="loginScreenUsername"
                    rowSpan={8}
                    style={[styles.textInput,{paddingLeft:0,height:200}]}
                    value={description}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setDescription(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Description About Item"
                  />
                  </View>
                </Form>
                <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>{t('screen.product.category')}</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Category"
                    placeholderStyle={{ color: Colors.primary }}
                    placeholderIconColor="#007aff"
                    value={category}
                    rightIconSource={Images.dropdown}
                    renderPicker={(_value, label ) => {
                      return (
                        <View style={styles.selectView}>
                          <Text style={[styles.selectText,{ width:wp('35'),}]} numberOfLines={1}>
                            {label} 
                          </Text>
                          <Image source={Images.dropdown} style={styles.selectIcon} />
                        </View>
                      );
                    }}
                    onChange={(text)=>{
                      setCategory(text)
                      setSubCategory(null)
                    }}
                    >
                       {
                        productSetup?.categories.map((items, index)=>{
                          return (<Picker.Item label={items.categoryName} value={items.id} />)
                        })
                      }
                  </Picker>
                </View> 
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>{t('screen.product.subCategory')}</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Sub Category"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    value={subcategory}
                    rightIconSource={Images.dropdown}
                    onChange={(text)=>setSubCategory(text)}
                    renderPicker={(_value, label ) => {
                      return (
                        <View style={styles.selectView}>
                          <Text style={[styles.selectText,{ width:wp('35'),}]} numberOfLines={1}>
                            {label} 
                          </Text>
                          <Image source={Images.dropdown} style={styles.selectIcon} />
                        </View>
                      );
                    }}
                    >
                    {
                        subcategoryList?.productCategory.map((items, index)=>{
                          return (<Picker.Item label={items.categoryName} value={items.id} />)
                        })
                      }
                  </Picker>
                </View> 
                  </Col>
                </Row>
                <Row style={styles.row}>
                <Col size={20}>
                  <Text style={styles.rowLabel}>{t('screen.product.currency')}</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    // mode="dropdown"
                    placeholder="Select Currency"
                    placeholderStyle={{ color: Colors.primary }}
                    placeholderIconColor="#007aff"
                    value={currency}
                    rightIconSource={Images.dropdown}
                    renderPicker={(_value, label ) => {
                      return (
                        <View style={styles.selectView}>
                          <Text style={styles.selectText}>
                            {label} 
                          </Text>
                          <Image source={Images.dropdown} style={styles.selectIcon} />
                        </View>
                      );
                    }}
                    onChange={(text)=>{
                      setCurrency(text)
                    }}
                    >
                       {
                        productSetup?.currency?.map((items, index)=>{
                          return (<Picker.Item label={items.currencyName} value={items.id} />)
                        })
                      }
                  </Picker>
                </View> 
                  </Col>
                  <Col size={80}>
                  <Text style={styles.rowLabel}>{t('screen.product.price')}</Text>
                  <Item style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={price}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setPrice(value)}

                    underlineColorAndroid="transparent"
                    placeholder="0.00"
                  />
                  </Item>
                  </Col>
                </Row>
                
              </View>,
              <View style={styles.form}>
                
                <Form style={styles.row}>
                  <Text style={styles.rowLabel}>{t('screen.product.address')}</Text>
                  <View style={styles.input}>
                  <Textarea
                    testID="loginScreenUsername"
                    rowSpan={3}
                    style={[styles.textInput,{paddingLeft:0,height:80}]}
                    value={address}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setAddress(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Your Address"
                  />
                  </View>
                </Form>
                <View style={styles.row}>
                <Text style={styles.rowLabel}>{t('screen.product.photos')}</Text>
                <ImageUploader />
                </View>                
              </View>,
              <View style={styles.form}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{t('screen.product.contactInformation')}</Text>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>{t('screen.product.contactName')}</Text>
                  <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={contactName}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setContactName(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Contact Name"
                  />
                  </View>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>{t('screen.product.ContactEmail')}</Text>
                  <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={contactEmail}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setContactEmail(text)}
                    underlineColorAndroid="transparent"
                    placeholder="XXXX@mail.com"
                  />
                  </View>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>{t('screen.product.ContactTelephone')}</Text>
                  <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={contactPhone}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setContactPhone(text)}
                    underlineColorAndroid="transparent"
                    placeholder="(252)-XX-XXXXXXX"
                  />
                  </View>
                </View>
              </View>
             
            ]}
            buttonStyle={styles.loginButton}
            buttonTextStyle={styles.loginText}
            onBack={() =>setActive(active - 1)}
            onFinish={submitForm}
            onNext={() =>handleNextScreen()}
          />
        </KeyboardAwareScrollView>
        </Content>
      </Container>
    )
  }


const mapStateToProps = (state) => {
  return {
    product: state.products.product,
    fetching: state.products.fetchingOne,
    updating: state.products.updating,
    error: state.products.errorUpdating,
    gallery: state.products.gallery,
    fetchingProductSetup: state.products.fetchingProductSetup,
    productSetup: state.products.productSetup,
    errorProductSetup: state.products.errorProductSetup,
    account:state.account.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(ProductActions.productRequest(id)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    updateProduct: (product) => dispatch(ProductActions.productUpdateRequest(product)),
    reset: () => dispatch(ProductActions.productReset()),
    getProductSetup: (option) => dispatch(ProductActions.productSetupRequest(option)),
    galleryReset: () => dispatch(ProductActions.galleryReset()),
    setGallery: (data) => dispatch(ProductActions.galleryStore(data)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostEditScreen);
