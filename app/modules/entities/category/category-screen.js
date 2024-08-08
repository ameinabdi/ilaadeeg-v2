import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import CategoryActions from './category.reducer';
import styles from './category-screen.style';
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

function CategoryScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const {t, i18n} = useTranslation();

  const { category,services, categoryList, getAllCategorys, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchCategory();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [category, fetchCategory]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductCategory', { category: item })}>
        <View style={styles.card}>
        <View style={styles.imageBg}>
        <Image source={item.thumnail[0]?.downloadUrl ? {uri:item.thumnail[0]?.downloadUrl}: Images.brokenimg}  style={styles.image}/>
        </View>  
           <Text style={styles.title}>{item?.categoryName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Categorys Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchCategory();
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
    getAllCategorys({'filter[categoryId]':category?.value, 'filter[name]':query})
    // props.performSearch(fullquery);
  };
  const fetchCategory = React.useCallback(() => {
    getAllCategorys({ categoryId:null });
  }, [getAllCategorys]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    // fetchCategory();
  };

  return (
    <Container testID="categoryScreen" style={styles.container}>
    <View style={styles.header}>
              <Left>
                <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}> {t('screen.category.title')} </Text>
              </Body>
              <Right/>
   </View>
    <View style={styles.content}>
    <FlatList
        contentContainerStyle={styles.listContent}
        data={categoryList?.rows}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
        numColumns={3}
      />
    </View>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    categoryList: state.category.categoryList,
    category: state.category.category,
    fetching: state.category.fetchingAll,
    error: state.category.errorAll,
    links: state.category.links,
    account: state.account.account,
    services: state.home.services,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategorys: (options) => dispatch(CategoryActions.categoryAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
