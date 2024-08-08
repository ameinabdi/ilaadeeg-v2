import React from 'react'
import { StatusBar,Image,Linking,  TouchableOpacity,  Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styles from './chat-screen.styles';
import { Colors } from '../../shared/themes';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';

 function ChatScreen(props) {
     const { navigation } = props;


   const LoadingIndicatorView=()=>{
      return(<ModelLoadingComponent />)
      } 
    return (
     <Container style={styles.container}>       
        <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>Chat Support</Text>
            </Body>
            <Right/>
      </View>
         <WebView
            originWhitelist={['*']}
            source={{ uri: 'https://tawk.to/chat/62e89a4954f06e12d88c6b40/1g9e9lc8n' }}  
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
          />
      </Container>
    )
}

const mapStateToProps = (state) => {
    return {
      account: state.account.account,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
  
