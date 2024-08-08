import React from 'react';
import { FlatList, Text,Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import WorkerActions from './worker.reducer';
import styles from './worker-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import SwiperComponent from '../../home/swiper.component';
import {useTranslation} from 'react-i18next';

function WorkerScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const {t, i18n} = useTranslation();

  const { worker, workerList, getAllWorkerCategories, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchworkers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [worker, fetchworkers]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('WorkerListScreen', { category: item })}>
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
  const renderEmpty = () => <AlertMessage title={t('screen.worker.notFound')} show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchworkers();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchworkers = React.useCallback(() => {
    getAllWorkerCategories({ id:account?.id, page: page - 1, sort, size });
  }, [getAllWorkerCategories, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchworkers();
  };
  return (
    <Container testID="workerScreen" style={styles.container}>
        <View style={styles.header}>
              <Left>
                 {/* <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/> */}
              </Left>
              <Body>
                <Text style={styles.haederTitle}> {t('screen.worker.title')}</Text>
              </Body>
              <Right/>
        </View>
        <SwiperComponent coupons={workerList?.coupons} navigation={props.navigation}/>
      <FlatList
        // contentContainerStyle={styles.listContent}
        data={workerList?.categories}
        renderItem={renderRow}
        numColumns={3}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    workerList: state.workers.workerCategoryList,
    worker: state.workers.worker,
    fetching: state.workers.fetchingCategoryAll,
    error: state.workers.errorCategoryAll,
    links: state.workers.links,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(WorkerActions.workerSearchRequest(query)),
    getAllWorkerCategories: (options) => dispatch(WorkerActions.workerCategoryAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerScreen);
