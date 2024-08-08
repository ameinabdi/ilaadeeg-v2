import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import BusinessActions from './business.reducer';
import styles from './business-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import {
  Picker,
} from 'react-native-ui-lib'; 
import _ from 'lodash';
import TextAvatar from 'react-native-text-avatar';
import {useTranslation} from 'react-i18next';

function BusinessScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState(null);
  const {t, i18n} = useTranslation();

  const { business,services, businessList,route, getAllBusinesss, fetching,account } = props;
  const { params } = route
  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchBusiness();
      if(params){
        setCategory({value:params?.category.id, label:params?.category.categoryName})
        getAllBusinesss({'filter[categoryId]':params?.category.id,})
      }
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [business,params, fetchBusiness]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BusinessDetailScreen', { businessDetail: item })}>
        <View style={styles.card}>
         <View style={styles.leftItem}>
         <TextAvatar
          backgroundColor={Colors.secondary}
          size={100}
          type="square" // optional
          >{item?.name}</TextAvatar>
         </View>
         <View style={styles.center}>
           <View style={styles.column}>
           <View style={styles.row}>
             <Text style={styles.titleName}>{item.name}</Text>
            </View>
            <View>
            <Text style={styles.title}>{t('screen.business.city')} </Text>
             <Text style={styles.text}>{item.locations?.city}</Text>
            </View>
           </View>
           <View style={styles.column}>
           <View style={styles.row}>
             <Text style={styles.text}>{item?.category?.categoryName}</Text>
            </View>
            <View>
              <Text style={styles.title}>{t('screen.business.address')}</Text>
              <Text style={styles.text}>{item.address}</Text>
            </View>
           </View>
        </View>
        <View style={styles.right}>
           
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Businesss Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchBusiness();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    fullquery = {
       filter:{
        categoryId:category?.value,
        name:query
       }
      
    }
    setSearchTerm(query);
    getAllBusinesss({'filter[categoryId]':category?.value, 'filter[name]':query})
    // props.performSearch(fullquery);
  };
  const fetchBusiness = React.useCallback(() => {
    getAllBusinesss({ categoryId:null });
  }, [getAllBusinesss]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    // fetchBusiness();
  };
  return (
    <Container testID="businessScreen" style={styles.container}>
    <View style={styles.header}>
    <View  style={styles.body}>
      <SearchBar onSearch={performSearch} />
    </View>
    <View style={styles.left}>
        <Picker
            
            placeholder="Category"
            value={category}
            onChange={(value)=>{
              getAllBusinesss({'filter[categoryId]':value.value})
              setCategory(value)}}
            style={styles.picker}
            topBarProps={{title: 'Categories'}}
            showSearch
            searchPlaceholder={t('screen.business.searchCategory')}
            searchStyle={{color: Colors.title, placeholderTextColor: Colors.text}}
            marginT-s4
            enableErrors={false}
            renderPicker={type => {
              if(type){
                return (
                  <View style={styles.selectPicker}>
                      <Text style={styles.selectTitle}>
                        {type?.label}
                      </Text>
                      <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                    </View>
                  );
              }else{
                return (
                  <View style={styles.selectPicker}>
                      <Text style={styles.selectTitle}>
                      {t('screen.business.category')} 
                      </Text>
                      <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                    </View>
                  );
              }
            }}
            // mode={Picker.modes.MULTI}
            // useNativePicker
          >
            {_.map(services?.categories, option => (
              <Picker.Item key={option.id} value={option.id} label={option.categoryName}/>
            ))}
          </Picker>
    </View>
    
    </View>
    <FlatList
        contentContainerStyle={styles.listContent}
        data={businessList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    businessList: state.business.businessList,
    business: state.business.business,
    fetching: state.business.fetchingAll,
    error: state.business.errorAll,
    links: state.business.links,
    account: state.account.account,
    services: state.home.services,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(BusinessActions.businessSearchRequest(query)),
    getAllBusinesss: (options) => dispatch(BusinessActions.businessAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessScreen);
