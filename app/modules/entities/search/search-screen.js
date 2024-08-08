import React from 'react';
import { FlatList, Text, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import SearchActions from './search.reducer';
import styles from './search-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors,Animation, Images } from '../../../shared/themes';
import Config from '../../../config/app-config';
import Modal from 'react-native-modal';
import SearchFilterComponent from './search-filter-component';
import { Badge } from 'react-native-ui-lib'; //eslint-disable-line
import ModelLoadingComponent from '../../../shared/components/loading/model-loading-component';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import {AnimatedImage} from 'react-native-ui-lib'; //eslint-disable-line
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function SearchScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const { search, searchList,filter,route,searching, getAllSearchs, fetching,account } = props;
  const { params } = route

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
     
      fetchSearchs();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [search,params, fetchSearchs]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { productId: item?.id })}>
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
        <View style={styles.right}>
           {/* <Image source={Images.star} style={styles.ratingIcon} />
           <Text  style={styles.ratingNumber}>{item.rate} 4.5</Text> */}
        </View>
      </View>
      </View>
    </TouchableOpacity>
    );
  };

  const handleModal = (data)=>{
    setIsModalVisible(!isModalVisible)
    }
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Searchs Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchSearchs();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    let fullquery = {
      'filter[title]':query,
    }
    filter.map((item)=>{
      Object.assign(fullquery, {[`filter[${item.type}]`]:item.value});
    })
    setSearchTerm(fullquery);
    props.performSearch(fullquery);
  };
  
  const fetchSearchs = React.useCallback(() => {
    getAllSearchs();
  }, [getAllSearchs, searchList]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    // fetchSearchs();
  };
  
  return (
    <Container testID="searchScreen" style={styles.container}>
        <View style={styles.header}>
          <View  style={styles.body}>
             <SearchBar onSearch={performSearch} />
          </View>
          <View style={styles.right}>
                    {!!filter && filter[0] && (
                         <View
                         bg="red"
                         position="absolute"
                         right={10}
                         top={-15}
                         w={10}
                         h={10}
                         rounded={6}
                         zIndex={1}
                         justifyContent="center"
                         >
                         <Badge
                         label={filter.length}
                         labelFormatterLimit={1}
                         backgroundColor={Colors.delete}
                         borderColor={Colors.delete}
                         />
                         </View>
                    )}
                <FeatherIcon name='sliders' size={20} color={Colors.white}  onPress={handleModal}/>
          </View>
        </View>
        {fetching || searching ?
        <LoadingComponent />
        :
        <FlatList
          contentContainerStyle={styles.listContent}
          data={searchList}
          numColumns={3}
          renderItem={renderRow}
          keyExtractor={keyExtractor}
          initialNumToRender={oneScreensWorth}
          ListEmptyComponent={renderEmpty}
        />
        }
      <Modal isVisible={isModalVisible} style={styles.model}>
         <View style={styles.modelContainer}>
          <View  style={styles.modelheader}>
          <Left>
              </Left>
              <Body>
                <Text style={styles.modelTitle}>Filter</Text>
              </Body>
              <Right>
              <Icon name="close" color={Colors.charcoal} style={styles.closebutton} size={20}  onPress={()=>handleModal()}/>
              </Right>
          </View>
          <View style={styles.modalContent}>
          <SearchFilterComponent handleModel={handleModal} performSearch={performSearch}/>
          </View>
         </View>
        </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    searchList: state.searchs.searchList,
    search: state.searchs.search,
    fetching: state.searchs.fetchingAll,
    searching: state.searchs.searching,
    error: state.searchs.errorAll,
    links: state.searchs.links,
    account: state.account.account,
    filter: state.searchs.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(SearchActions.searchSearchRequest(query)),
    getAllSearchs: (options) => dispatch(SearchActions.searchAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
