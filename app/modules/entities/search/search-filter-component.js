import React from 'react';
import { FlatList, Text,ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import SearchActions from './search.reducer';
import styles from './search-filter-component.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Container,Header, Left, Right, Content, } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Colors,Animation, Images } from '../../../shared/themes';
import Config from '../../../config/app-config';
import ProductActions from '../product/product.reducer'
import { Col, Row } from "react-native-easy-grid";
import {  Picker, } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';


function SearchFilter(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState(null);
  const [subcategory, setSubCategory] = React.useState(null);
  const [sortby, setSortby] = React.useState(null);
  const { search, filter, handleModel, Searchfilter, ClearFilter, fetchingProductSetup, searchList, getProductSetup, getAllSearchs, fetching,account,productSetup } = props;
  const {t, i18n} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      getProductSetup();
      if(filter){
        filter.map((item)=>{
          if(item.type == 'category'){
            setCategory(item)
          }
          if(item.type == 'subcategory'){
            setSubCategory(item)
          }
          if(item.type == 'sortby'){
            setSortby(item)
          }
        })
      }else{
        setCategory(null)
        setSubCategory(null)
        setSortby(null)
      }
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [search,filter, getProductSetup]),
  );

  if (fetchingProductSetup || !productSetup) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  handlefilterClear=()=>{
    getAllSearchs();
    ClearFilter()
    handleModel()
  }
  handlefilterSearch=()=>{
    let fullquery = {
      'filter[title]':'',
    }
    filter.map((item)=>{
      Object.assign(fullquery, {[`filter[${item.type}]`]:item.value});
    })
    props.performSearch(fullquery);
    handleModel()
  }

  const subcategoryList = productSetup?.categories.find((item,index)=> item.id === category?.value ? item.productCategory : null)

  return (
    <Container testID="searchScreen" style={styles.container}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} testID="productEditScrollView">
    <Row style={styles.row}>
                  <Text style={styles.rowLabel}>{t('screen.search.sortBy')}</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Sort By"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    value={sortby}
                    rightIconSource={Images.dropdown}
                    onChange={(text)=>{
                      setSortby(text)
                      Searchfilter({...text,type:"sortby",} )

                    }}
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
                        productSetup?.sortby?.map((items, index)=>{
                          return (<Picker.Item label={items.name} value={items.id} />)
                        })
                      }
                  </Picker>
                </View> 
                </Row>
    <Row style={styles.row}>
                  <Text style={styles.rowLabel}>{t('screen.search.category')}</Text>
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
                      Searchfilter({...text,type:"category",} )
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
                  </Row>
                  <Row style={styles.row}>
                  <Text style={styles.rowLabel}>{t('screen.search.subCategory')}</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Sub Category"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    value={subcategory}
                    rightIconSource={Images.dropdown}
                    onChange={(text)=>{
                      setSubCategory(text)
                      Searchfilter({...text,type:"subcategory",} )
                    }}
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
                </Row>
                <View style={styles.footer}>
                
                  <Button style={styles.button} transparent onPress={handlefilterSearch}>
                    <FeatherIcon name='search' color={Colors.white} size={20} />
                    <Text style={styles.buttonText}>{t('screen.search.search')}</Text>
                  </Button>
                  <Button style={styles.buttonTrash} transparent onPress={handlefilterClear}>
                    <FeatherIcon name='trash' color={Colors.delete} size={20} />
                    <Text style={styles.buttonTrashText}>{t('screen.search.clearAll')} </Text>
                  </Button>
                 </View>
    </KeyboardAwareScrollView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    searchList: state.searchs.searchList,
    search: state.searchs.search,
    filter: state.searchs.filter,
    fetching: state.searchs.fetchingAll,
    error: state.searchs.errorAll,
    links: state.searchs.links,
    account: state.account.account,
    fetchingProductSetup: state.products.fetchingProductSetup,
    productSetup: state.products.productSetup,
    errorProductSetup: state.products.errorProductSetup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(SearchActions.searchSearchRequest(query)),
    getAllSearchs: (options) => dispatch(SearchActions.searchAllRequest(options)),
    getProductSetup: (option) => dispatch(ProductActions.productSetupRequest(option)),
    Searchfilter: (options) => dispatch(SearchActions.searchFilterRequest(options)),
    ClearFilter: (options) => dispatch(SearchActions.clearFilterRequest(options)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
