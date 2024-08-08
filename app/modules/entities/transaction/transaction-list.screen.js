import React from 'react';
import { FlatList, Text,ScrollView,Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Colors,Animation, Images } from '../../../shared/themes';
import transactionActions from './transaction-reducer';
import styles from './transaction-list-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";
import LottieView from 'lottie-react-native';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import { VictoryPie } from "victory-native";
import { Tab, Tabs } from 'native-base';
import '../../../../i18n';
import {useTranslation} from 'react-i18next';
import Svg, {
  Circle,
  Text as TextSvg
} from 'react-native-svg';
import _ from 'lodash';
import randomColor from  'randomcolor'
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
const color = randomColor({
  luminosity: 'bright',
  hue: Colors.primary,
  alpha: 0.8 ,
  count: 10,
})
const TABS = ['Home', 'Posts', 'Reviews', 'Videos', 'Photos', 'Events', 'About', 'Community', 'Groups', 'Offers'];


function TransactionScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [isRefreshing, setIsRefreshing] = React.useState('');
  const {t, i18n} = useTranslation();

  const { transactions, getAllTransactions, fetching,navigation,account,route } = props;
  const filter = route.params

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchTransactions();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [filter, fetchTransactions]),
  );

  const onInnerRefresh= ()=> {
    startRefreshing();
    fetchTransactions()
   }
 
    
  const startRefreshing = ()=> {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={()=>props.navigation.navigate('TransactionDetailScreen', { transaction: item })}>
         <CardItem style={styles.cardItem}  >
          <View style={styles.left}>
            <Text style={styles.cardTitle}>{item.fromProvider?.providerName}</Text>
          </View>
          <View style={styles.centerborder}>
            <Image source={Images.arrowRight} style={[styles.carIcon,{color:item.fromProvider?.colorbrand}]} />
          </View>
          <Left  style={styles.right}>
             <Text style={styles.cardTitle}>{item.toProvider?.providerName}</Text>
          </Left>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.left}>
            <Text style={styles.cardAmount}>{item?.fromAmount} {'\n'} {item.fromCurrency}</Text>
          </View>
          <View style={styles.center}>
              <Text style={styles.cardTime}>{moment(item.createdAt).fromNow()}</Text>
          </View>
          <Left  style={styles.right}>
             <Text style={styles.cardAmount}>{item?.toAmount} {'\n'} {item.toCurrency}</Text>
          </Left>
        </CardItem>
      </TouchableOpacity>
    );
  };
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="Sorry! No Transactions Yet" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchTransactions = React.useCallback(() => {
    getAllTransactions({id:account.id,filter});
  }, [getAllTransactions,filter]);

const total  =  _.sumBy(transactions, function(row) { 
  if(row.fromCurrency ==="SLSH" && row.rateSLSH){
    return parseFloat(row.fromAmount)/parseFloat(row.rateSLSH)
  }
  return  parseFloat(row.fromAmount)
 }); 
 let grouped = _.chain(transactions)
 .groupBy('fromProvider.providerName')
 .map((value, key) => {
   return { name: key, color:value[0]?.fromProvider?.colorbrand, colorBg: value[0]?.fromProvider?.colorbrandBg,  provider: value }})
 .value();
 const totalData= _.map(grouped, (group)=>{
   return {x:group.name, y:_.sumBy(group.provider, (item)=>{
    if(item.fromCurrency ==="SLSH" && item.rateSLSH){
      return parseFloat(item.fromAmount)/parseFloat(item.rateSLSH)
    }
    return  parseFloat(item.fromAmount)
   }) }
 })
 const colors= _.map(grouped, (group)=>(group.color))
 
  if(fetching){
    return (
      <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>{t('screen.transaction.title')}</Text>
            </Body>
            <Right/>
      </View>
      <LoadingComponent />
      </Container>
    )
  }

  return (
    <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>{t('screen.transaction.title')}</Text>
            </Body>
            <Right/>
      </View>
      <PullToRefreshView
          minPullDistance={120}
          pullAnimHeight={120}
          pullAnimYValues={{from: 0, to: 10}}
          isRefreshing={isRefreshing}
          onRefresh={onInnerRefresh}
          contentComponent={
            <ScrollView style={styles.content}>
              <View style={styles.contentHeader}>
              <Svg width={300} height={300}>
              <TextSvg x="150" y="150" fill="black" textAnchor="middle"  fontSize={25}>
               {'$- '+total}
              </TextSvg>
              <TextSvg x="150" y="180" fill="black" textAnchor="middle"  fontSize={18}>
              {t('screen.transaction.Total')} 
              </TextSvg>
                  <VictoryPie
                    colorScale={colors}
                    data={totalData}
                    labels={({ datum }) => {return null}}
                    padAngle={({ datum }) => 4}
                    innerRadius={75}
                    labelPosition="centroid"
                    standalone={true}
                    width={300} height={300}
                 />
                    
              </Svg>
              <View style={styles.bottomSection}>
              {_.map(grouped, (group, index)=>{
                  return(
                  <View style={[styles.bottomCol,{backgroundColor:group.colorBg}]}>
                    <View style={styles.rowCal}>
                      <View style={[styles.colorCard,{backgroundColor:group.color}]} />
                      <Text style={styles.titleCard}>{" Total "+group.name}</Text>
                  </View>
                  <Text style={styles.totalAmount}>{_.sumBy(group.provider, (item)=>{
                              if(item.fromCurrency ==="SLSH" && item.rateSLSH){
                                return parseFloat(item.fromAmount)/parseFloat(item.rateSLSH)
                              }
                              return  parseFloat(item.fromAmount)
                            })+" USD"}
                        </Text>
                </View>
                )
                })
              }
              </View>
              
              </View>
              <Tabs>
              <Tab heading="All" textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
              <FlatList
                contentContainerStyle={styles.listContent}
                data={transactions}
                renderItem={renderRow}
                keyExtractor={keyExtractor}
                initialNumToRender={oneScreensWorth}
                ListEmptyComponent={renderEmpty}
                scrollEnabled={false}
              />
              </Tab>
                {_.map(grouped, (group, index)=>{
                  return(
                    <Tab heading={group.name} key={index} textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
                      <FlatList
                        contentContainerStyle={styles.listContent}
                        data={group.provider}
                        renderItem={renderRow}
                        keyExtractor={keyExtractor}
                        initialNumToRender={oneScreensWorth}
                        ListEmptyComponent={renderEmpty}
                        scrollEnabled={false}
                      />
                    </Tab>
                  )
                })
              }
              
              </Tabs>
            </ScrollView>
        }
      >
        <View style={styles.loadingview}>
         <LottieView
         autoPlay
         style={styles.lottieView}
         source={Animation.pulldown}
         />         
       </View> 
       </PullToRefreshView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here\
    transac: state.transaction,
    transactions: state.transaction.transactions,
    fetching: state.transaction.fetchingTransaction,
    error: state.transaction.errorTransaction,
    account: state.account.account,

   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTransactions: (options) => dispatch(transactionActions.transactionAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen);