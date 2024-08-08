import React from 'react';
import { ScrollView,BackHandler,Alert, TextInput, Text,StyleSheet,StatusBar, View,Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import {  Colors, Images } from '../../themes';
import styles from '../../../modules/home/home-screen.styles';
import {  Button, Container, Content, Left,Header,Body,Right, Tab, Tabs, Row,Col } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import {  Picker, Avatar} from 'react-native-ui-lib';
import _ from 'lodash';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



function HomeSkeletonScreen(props) {
  const { navigation,updating,updatingError,versionError, getVersion,versionFetching,version, transaction,getChargeFee,reset, account,createTransaction, fetching,services,fetchingChargeFee, chargeFee, error, locations, getService } = props;
 // if the user is already logged in, send them home
 
  return (
    <Container style={styles.container}>
     <Header style={styles.header} translucent transparent>
       <Left>
        <Button style={styles.menubutton} transparent onPress={()=>navigation.openDrawer()}>
          <Icon name="align-left" size={25} color={Colors.white} />
        </Button>
       </Left>
       <Body>
       </Body>
       <Right>
       </Right>
     </Header>
     <Content style={styles.content}>
      <Text style={styles.Contenttitle}>
         Exchange Money
      </Text>
      <View style={styles.sectionContainer}>
      <SkeletonPlaceholder backgroundColor={Colors.primaryBg}>
        <Row style={styles.row}>
          
        </Row>
        </SkeletonPlaceholder>
      </View>
      <View style={styles.sectionExchange}>
        <View style={styles.exchangeView}>
          <Image source={Images.exchange} style={styles.exchangeIcon}/>       
        </View>
      </View>
      <View style={styles.sectionContainer}>
      <SkeletonPlaceholder backgroundColor={Colors.primaryBg}>
        <Row style={styles.row}>
          
        </Row>
        </SkeletonPlaceholder>
      </View>
      <View style={styles.sectionFooter}>
       
         <SkeletonPlaceholder backgroundColor={Colors.primaryBg}>
            <Row style={styles.section}>
           
            </Row>
        </SkeletonPlaceholder>
        
      </View>
     </Content>
  </Container>
  );
}

const mapStateToProps = (state) => ({ 
  

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(HomeSkeletonScreen);
