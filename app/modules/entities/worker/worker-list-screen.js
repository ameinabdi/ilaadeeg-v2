import React from 'react';
import { FlatList, Text,Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import WorkerActions from './worker.reducer';
import styles from './worker-list-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import TextAvatar from 'react-native-text-avatar';
import { Badge } from 'react-native-ui-lib'; //eslint-disable-line
import { Rating  } from 'react-native-ratings';
import {useTranslation} from 'react-i18next';

function WorkerListScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const {t, i18n} = useTranslation();

  const { worker, workerList, route, getAllWorkers, fetching,account } = props;
  const { category } = route.params

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchworkers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [worker,category, fetchworkers]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('WorkerDetail', { employee: item })}>
        <View style={styles.card}>
          <View style={styles.left}>
          <TextAvatar
           backgroundColor={Colors.secondary}
           size={50}
           type={'circle'} // optional
          >{item.fullname? item.fullname : 'US'}</TextAvatar>
          </View>
          <View style={styles.center}>
           <View style={styles.row}>
              <Text style={styles.username}>{item?.fullname}</Text>

              <Text style={styles.city}>{item?.city?.city}</Text>
             
              <View style={styles.badge}>
               <Text style={styles.badgeText}>{item?.professions?.categoryName}</Text>
              </View>
           </View>
          </View>
          <View style={styles.right}>
           <Rating
                type='custom'
                ratingColor={Colors.primary}
                ratingBackgroundColor={Colors.secondaryBackground}
                tintColor={Colors.white}
                ratingCount={5}
                imageSize={15}
                startingValue={item.rate}
                readonly={2}
                disabled={true}
                style={styles.rating}
              />
              <Text style={styles.rightText}>{'USD '+item?.salary+' / '+item?.salaryType}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Bookings Found" show={!fetching} />;

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
    getAllWorkers({'filter[category]':category.id});
  }, [getAllWorkers, category, sort, size]);

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
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.goBack()}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}>{t('screen.worker.listTitle')}</Text>
              </Body>
              <Right/>
        </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={workerList}
        renderItem={renderRow}
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
    workerList: state.workers.workerList,
    worker: state.workers.worker,
    fetching: state.workers.fetchingAll,
    error: state.workers.errorAll,
    links: state.workers.links,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(WorkerActions.workerSearchRequest(query)),
    getAllWorkers: (options) => dispatch(WorkerActions.workerAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerListScreen);
