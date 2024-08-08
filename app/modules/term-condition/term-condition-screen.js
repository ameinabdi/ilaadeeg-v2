import React from 'react'
import { StatusBar,Image,Linking,  TouchableOpacity,  Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styles from './term-condition-screen.styles';
import LottieView from 'lottie-react-native';
import {Animation,Colors, Images} from '../../shared/themes';
import { Container, } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';
import {useTranslation} from 'react-i18next';

 function TermConditionScreen(props) {
     const { navigation } = props;
     const {t, i18n} = useTranslation();

     const LoadingIndicatorView=()=>{
      return(<ModelLoadingComponent />)
      } 
    return (
      <Container style={styles.container}>       
      <View style={styles.header}>
          <View style={styles.left}>
             <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>{t('screen.term.title')}</Text>
          </View>
    </View>
       <WebView
          originWhitelist={['*']}
          source={{ uri: 'https://ilaadeeg.com/term-condition' }}  
 
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TermConditionScreen);
  
