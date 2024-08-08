import React from 'react'
import { StatusBar,Image,Linking,  TouchableOpacity,  Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styles from './language-screen.styles';
import LottieView from 'lottie-react-native';
import {Animation,Colors, Images} from '../../shared/themes';
import { Card, CardItem, Body,  Form,Button, Item, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';
import { Picker } from 'react-native-ui-lib'
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import AccountActions from '../../shared/reducers/account.reducer';

 function LanguageScreen(props) {
     const { navigation,language,languageRequest } = props;
     const {t, i18n} = useTranslation();
     const [currentLanguage,setLanguage] =React.useState(null);

     const languages = [
      {
        key:1,
        label:'ENGLISH',
        value:'en'
      },
      {
        key:2,
        label:'SOMALI',
        value:'so'
      }
    ]
     React.useEffect(() => {
      if(language ){
        i18n
          .changeLanguage(language)
          .then(() => setLanguage(language))
          .catch(err => err);
      }
      }, []);


      changeLanguage = value => {
        i18n
          .changeLanguage(value)
          .then(() => setLanguage(value))
          .catch(err => err);
          languageRequest(value)
      };
    
    return (
     <Container style={styles.container}>       
        <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.headerTitle}>Change Languange</Text>
            </Body>
            <Right/>
      </View>
      <Text style={styles.languageTitle}> {t('screen.intro.language')}</Text>
          <View style={styles.language}>
          <Picker
                    containerStyle={styles.textInputPicker}
                    style={styles.picker}
                    value={currentLanguage}
                     rightIconSource={Images.dropdown}
                    onChange={(value)=>{
                      changeLanguage(value.value)}}
                    renderPicker={type => {
                      if(type){
                        return (
                          <View style={styles.selectPicker}>
                              <Text style={styles.selectTitle}>
                                {type.toUpperCase()}
                              </Text>
                              <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                            </View>
                          );
                      }else{
                        return (
                          <View style={styles.selectPicker}>
                              <Text style={styles.selectTitle}>
                                Language
                              </Text>
                              <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                            </View>
                          );
                      }
                    }}
                    >
                      {_.map(languages, items => (
                      <Picker.Item
                        key={items?.key}
                        value={items}
                        renderItem={(item, props) => (
                          <View
                            style={styles.list}
                          >
                            <View style={styles.listRow}>
                              <Text style={styles.listTitle}>
                              {items?.label.toUpperCase()}
                              </Text>
                            </View>
                          </View>
                        )}
                        getItemLabel={item => item.key}
                      />
                    ))}
                  </Picker>
          </View>
      </Container>
    )
}

const mapStateToProps = (state) => {
    return {
      account: state.account.account,
      language:state.account.language

    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
      languageRequest: (language) => dispatch(AccountActions.languageRequest(language)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
  
