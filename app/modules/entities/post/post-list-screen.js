import React from 'react';
import { FlatList, Text, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import PostActions from './post.reducer';
import styles from './post-list-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import Config from '../../../config/app-config';
import {useTranslation} from 'react-i18next';


function PostScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const {t, i18n} = useTranslation();

  const { post, postList, getAllPosts, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchPosts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [post, fetchPosts]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>props.navigation.navigate('ProductViewScreen',{ productItem: item })}>
        <View style={styles.card}>
         <View style={styles.left}>
           <Image source={item?.thumbnail[0]?.downloadUrl ?  {url:item?.thumbnail[0]?.downloadUrl} : Images.brokenimg} style={styles.profile} />
         </View>
         <View style={styles.center}>
           <View style={styles.column}>
           <View style={styles.row}>
             <Text style={styles.title}>{item?.title}</Text>
            </View>
            <View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.title}>Category</Text>
                <Text style={styles.text}>{item?.category?.categoryName}</Text>
              </View>
               <View style={styles.col}>
                <Text style={styles.title}>Price</Text>
                <Text style={styles.text}>{item?.price}</Text>
              </View>
             </View>
            </View>
           </View>
           <View style={styles.column}>
           <View style={styles.row}>
              <Text style={styles.title}>{moment(item?.createdAt).fromNow()}</Text>
            </View>
            <View>
              <Text style={styles.title}>Status</Text>
              <View style={[styles.badge,{backgroundColor:item?.productTypeColor}]}>
          <Text style={styles.badgeText}>{item?.status}</Text>
        </View>
                    </View>
           </View>
           
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Posts Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchPosts();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchPosts = React.useCallback(() => {
    getAllPosts({ id:account.id});
  }, [getAllPosts, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchPosts();
  };

  
  return (
    <Container testID="postScreen" style={styles.container}>
        <View style={styles.header}>
              <Left>
                 <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}> {t('screen.post.title')}</Text>
              </Body>
              <Right/>
        </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={postList}
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
    postList: state.posts.postList,
    post: state.posts.post,
    fetching: state.posts.fetchingAll,
    error: state.posts.errorAll,
    links: state.posts.links,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(PostActions.postSearchRequest(query)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
