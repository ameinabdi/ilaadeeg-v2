import React from 'react'
import { FlatList, Text, TouchableOpacity,Image, View } from 'react-native'
import { connect } from 'react-redux'
import EventActions from './event.reducer'
import styles from './event-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { Container, Header, Tabs,Tab,Title,Badge, Content, Button,Right,List,ListItem, Left, Body,Thumbnail, Card,CardItem } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../../shared/themes'
import moment from 'moment';

// More info here: https://reactnative.dev/docs/flatlist.html

class EventEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
    }
  }

  componentDidAppear() {
    this.fetchEvents()
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity style={styles.row} key={item.id} onPress={()=>{}}>
            <View style={styles.left}>
              <Image source={{uri: item.thumbnail ? item.thumbnail[0]? item.thumbnail[0].downloadUrl :'':''}} style={styles.thumbnail} />
            </View>
            <View style={styles.middle}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {item.eventTitle}
                  </Text> 
                  <Text style={styles.eventSubTitle} numberOfLines={3}>
                    {item.summary}
                  </Text>    
                  <Text style={styles.eventlocation} numberOfLines={1}>
                   <Icon name="enviroment" size={16} color={Colors.primary} /> {item.location[0]?.address1}
                  </Text>          
            </View>
            <View style={styles.right}>
                <Text style={styles.eventDate} numberOfLines={2}>
                {item.schedule ? item.schedule[0] ? moment(item.schedule[0].startDate).format('D MMM'):null:null} 
                  </Text>
                  <Text style={styles.eventTime} numberOfLines={1}>
                 {item.schedule ? item.schedule[0] ? moment(item.schedule[0].startTime).format("h:mm a") :null:null}
                  </Text>
            </View>
      </TouchableOpacity>
    )
  }

  // Render a header
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Events Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchEvents = () => {
    const { account } = this.props;
    this.props.getAllEvents({ filter:{createdBy:account.id}, 'tenentId': account.tenants ? account.tenants[0].tenantId : null  })
  }


  render() {

   const pastDate = this.props.events.filter(item => {
      let date = new Date(item.createdAt);
      return  date >= new Date();
   })
   const inComingDate = this.props.events.filter(item => {
    let date = new Date(item.createdAt);
    return  date <= new Date();
 })
    return (
      <View style={styles.container} testID="eventScreen">
        <Header style={styles.header} hasTabs>
           <Left>
          </Left>
          <Body>
          <Text style={styles.title}>
            My Events
          </Text>
          </Body>
          <Right>

          </Right>
        </Header>
        <Tabs>
          <Tab heading="Incoming">
              <FlatList
              contentContainerStyle={styles.listContent}
              data={inComingDate}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              /* ListHeaderComponent={this.renderHeader} */
              /* ListFooterComponent={this.renderFooter} */
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </Tab>
          <Tab heading="Past">
              <FlatList
              contentContainerStyle={styles.listContent}
              data={pastDate}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              /* ListHeaderComponent={this.renderHeader} */
              /* ListFooterComponent={this.renderFooter} */
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </Tab>
        </Tabs>
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    events: state.events.events,
    fetching: state.events.fetchingAll,
    error: state.events.errorAll,
    links: state.events.links,
    account:state.account.account

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEntityScreen)
